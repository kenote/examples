import { Middleware, Action, Context, Property } from '@kenote/core'
import * as service from '~/services'
import { setJwToken } from './auth'
import { HttpError } from 'http-errors'

@Middleware({
  headers: {
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE'
  }
})
export default class Restful {

  @Action()
  notfound (ctx: Context) {
    return async () => {
      await ctx.status(404)
    }
  }

  @Action()
  api (ctx: Context) {
    return (info: any, error?: HttpError) => {
      if (error) {
        let { message } = error
        ctx.json({ error: message })
      }
      else {
        ctx.json({ data: info })
      }
    }
  }

  @Property()
  service (ctx: Context) {
    return service
  }

  @Action()
  setJwToken (ctx: Context) {
    return setJwToken
  }
}

declare module '@kenote/core' {
  interface Context {
    /**
     * 返回 Not Found.
     */
    notfound (): Promise<void>
    /**
     * 调用 API 出口
     * @param info 
     * @param error 
     */
    api (info: any, error?: Error): void
    /**
     * 调用 Services 接口
     */
    service: typeof service
    /**
     * 设置 JWT Token
     */
    setJwToken: typeof setJwToken
  }
}