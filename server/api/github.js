const gql = require('graphql-tag')
const { ApolloClient } = require('apollo-client')
const { InMemoryCache } = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    fetch: require('node-fetch'),
    headers: {
      authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      'client-name': 'GraphQL Deathmatch',
      'client-version': '1.0.0',
    },
  })
});

const GET_REPO = gql`
  query GET_REPO($owner: String! $name: String!) {
    repository(owner: $owner, name: $name) {
      owner {
        avatarUrl
      }
      description
      stargazers {
        totalCount
      }
      watchers {
        totalCount
      }
    }
  }`

module.exports = async (id) => {
  const [owner, name] = id.split('/')
  const { data } = await client.query({
    query: GET_REPO,
    variables: { owner, name }
  })

  return {
    id: `${owner}/${name}`,
    avatarUrl: data.repository.owner.avatarUrl,
    description: data.repository.description,
    hitPoints: data.repository.stargazers.totalCount,
    attack: data.repository.watchers.totalCount,
    damage: 0
  }
}
