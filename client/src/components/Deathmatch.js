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

const colGrid = {
  display: 'grid',
  gridGap: '1em',
  justifyItems: 'center',
  alignItems: 'center'
}

const col2Grid = {
  ...colGrid,
  gridAutoFlow: 'column',
  gridtemplateColumns: 'repeat(2, 1fr)',
}

const inputStyle = {
  fontSize: '1.4em',
  width: '400px'
}

const buttonStyle = {
  fontSize: '1.4em'
}

const imgStyle = {
  height: '200px',
  width: '200px'
}

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
          return (
            <>
              <div style={col2Grid}>
                <input name="leftId" style={inputStyle} value={this.state.leftId} onChange={this.handleChange} placeholder="Repo 1" />
                <input name="rightId" style={inputStyle} value={this.state.rightId} onChange={this.handleChange} placeholder="Repo 1" />
              </div>
              <div style={colGrid}>
                <button style={buttonStyle} onClick={fight}>FIGHT!</button>
              </div>
              <div style={colGrid}>
                {loading && <p>Loading...</p>}
                {error && <p>{error.message}</p>}
                {data && (
                  <>
                    <p>Winner</p>
                    {data.fight.winner && <img style={imgStyle} src={data.fight.winnerAvatarUrl} alt="winner" />}
                    {!data.fight.winner && <p>Everyone <span role="img" aria-label="No Winner">💀</span> Died...</p>}
                  </>
                )}
              </div>
              <div>{JSON.stringify(data, null, 2)}</div>
            </>
          )
        }}
      </Mutation>
    )
  }
}

export default Deathmatch
