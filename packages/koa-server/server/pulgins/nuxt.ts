import { Nuxt, Builder } from 'nuxt'
import nuxtConfig from '@/nuxt.config.js'
import { toRequestHandler } from '@kenote/koa'
import { IModule } from '@kenote/core'

const dev: boolean = process.env.NODE_ENV !== 'production'
const nuxt: Nuxt = new Nuxt({ ...nuxtConfig, dev })

async function nuxtReady () {
  await nuxt.ready()
  if (process.env.NODE_ENV === 'development') {
    const builder = new Builder(nuxt)
    await builder.build()
  }
}

const nuxtPulgin: IModule.ssrPlugin = {
  handler: [
    toRequestHandler(ctx => {
      ctx.status(200)
      ctx.context.respond = false
      ctx.req.ctx = ctx.context
      nuxt.render(ctx.req, ctx.res)
    })
  ],
  prescript: nuxtReady
}
export default nuxtPulgin