import React from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag'

const FIGHT = gql`
mutation FIGHT($leftId: ID!, $rightId: ID!) {
  fight(leftId: $leftId, rightId: $rightId) {
    rounds
    winner
    winnerAvatarUrl
    right {
      id
      hitPoints
      damage
    }
    left {
      id
      hitPoints
      damage
    }
  }
}
`

class Deathmatch extends React.Component {
  state = {
    leftId: '',
    rightId: ''
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    return (
      <Mutation mutation={FIGHT} variables={this.state}>
        {(fight, { data, error, loading }) => {
          console.log(data)
          return (
            <>
              <input name="leftId" value={this.state.leftId} onChange={this.handleChange} placeholder="Repo 1" />
              <input name="rightId" value={this.state.rightId} onChange={this.handleChange} placeholder="Repo 1" />
              <button onClick={fight}>FIGHT!</button>
              {loading && <p>Loading...</p>}
              {error && <p>{error.message}</p>}
              {data && (
                <>
                  <p>Winner</p>
                  {data.fight.winner && <img style={{ height: '100px', width: '100px' }} src={data.fight.winnerAvatarUrl} alt="winner" />}
                  {!data.fight.winner && <p>Everyone <span role="img" aria-label="No Winner">💀</span> Died...</p>}
                </>

              )}
            </>
          )
        }}
      </Mutation>
    )
  }
}

export default Deathmatch
