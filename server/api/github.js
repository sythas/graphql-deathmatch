const { ApolloClient, InMemoryCache, HttpLink, gql } = require('apollo-boost')

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    fetch: require('node-fetch'),
    headers: { authorization: `bearer ${process.env.GITHUB_TOKEN}` },
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
