import { ApolloServer } from 'apollo-server-express'
import { buildSchemaSync, NonEmptyArray } from 'type-graphql'
import * as resolvers from '~/resolvers'

const server = new ApolloServer({ 
  schema: buildSchemaSync({
    resolvers: Object.entries(resolvers).map( ([key, val]) => val ) as unknown as NonEmptyArray<Function>,
    validate: false
  }),
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  },
  introspection: true
})

export default [ server.getMiddleware() ]