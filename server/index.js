require('dotenv').config()
const { readFileSync } = require('fs')
const { ApolloServer, gql } = require('apollo-server')

const typeDefs = readFileSync('./schema.graphql', 'UTF8')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    getChallenger: require('./api/github')
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
