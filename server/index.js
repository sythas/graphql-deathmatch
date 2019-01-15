require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: require('./resolvers'),
  context: {
    getChallenger: require('./api/github')
  }
})

server.start(() => console.log('Server is running on localhost:4000'))
