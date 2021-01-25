import koaPassport from '@kenote/koa-passport'
import passport from 'koa-passport'
import { strategyJwt } from '~/middleware/auth'
import { Context } from '@kenote/koa'

// Add Jwt Strategy
passport.use(strategyJwt)

export default koaPassport()

/**
 * JWT 认证
 * @param ctx 
 * @param next 
 */
export const authenticate = async (ctx: Context, next) => {
  await passport.authenticate('jwt', { session: false })(ctx.context, next)
  ctx.user = ctx.context.state?.user
}