require('dotenv').config()
const { GraphQLServer, PubSub } = require('graphql-yoga')

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: require('./resolvers'),
  context: {
    getChallenger: require('./api/github'),
    pubsub: new PubSub()
  }
})

server.start(() => console.log('Server is running on localhost:4000'))
