import { Controller, Get, Post, Put, Delete, Context, NextHandler } from '@kenote/core'
import { getMetadataStorge } from '~/pulgins'

const { authenticate } = getMetadataStorge()

@Controller('/user')
export default class UserController {

  @Get('/', {
    filters: [ authenticate ]
  })
  async home (ctx: Context) {
    
    if (ctx.user) {
      await ctx.render('user', { user: ctx.user })
    }
    else {
      await ctx.render('login', {})
    }
  }

  @Get('/logout')
  logout (ctx: Context) {
    ctx.logout()
    ctx.cookie('token', null!)
    ctx.redirect('/v1/user')
  }
  
  @Post('/login')
  async login (ctx: Context, next: NextHandler) {
    let { username } = ctx.body
    try {
      if (!username) {
        ctx.throw(500, '用户名不能为空', { code: 1000 })
      }
      await ctx.login({ username })
      ctx.redirect('/v1/user')
    } catch (error) {
      ctx.service.nextError(error, ctx, next)
    }
  }
}