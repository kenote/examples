import { Module, Context } from '@kenote/core'
import StaticModule from './application.static'
import TemplateModule from './application.template'
import Restful from './middleware/restful'
import ControllerV1Module from './application.controller.v1'
import sessionPlugin from './pulgins/session'
import passportPlugin from './pulgins/passport'
import nuxtPulgin from './pulgins/nuxt'
import graphqlPulgin from './pulgins/graphql'

@Module({
  imports: [ StaticModule, TemplateModule, ControllerV1Module ],
  plugins: [ sessionPlugin, passportPlugin, graphqlPulgin.handler ],
  middlewares: [ Restful ],
  ssrPlugins: [ nuxtPulgin ],
  httpException: {
    notFound: async (ctx: Context) => {
      return await ctx.status(404).render('error', { message: 'This page could not be found.' })
    },
    exception: (err, ctx: Context) => {
      ctx.renderException('error', { message: 'This page could internal server error' })
    }
  }
})
export default class ApplicationModule {}