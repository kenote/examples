import { ApolloServer, gql } from 'apollo-server-koa'
import { IModule } from '@kenote/core'

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const graphqlPulgin: IModule.ssrPlugin = {
  handler: [
    server.getMiddleware()
  ],
  
}
export default graphqlPulgin