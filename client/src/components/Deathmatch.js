import { gql } from 'apollo-boost'
import React, { useState } from 'react'
import { Mutation } from 'react-apollo'

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

export default () => {
  const [leftId, setLeftId] = useState('')
  const [rightId, setRightId] = useState('')

  // const setLeftId = () => { }
  // const setRightId = () => { }
  // const data = null
  // const error = false
  // const loading = false
  // const fight = () => { }
  // const leftId = ''
  // const rightId = ''

  return (
    <Mutation mutation={FIGHT} variables={{ leftId, rightId }}>
      {(fight, { data, loading, error }) => (
        <>
          <div style={col2Grid}>
            <input style={inputStyle} value={leftId} onChange={evt => setLeftId(evt.target.value)} placeholder="Repo 1" />
            <input style={inputStyle} value={rightId} onChange={evt => setRightId(evt.target.value)} placeholder="Repo 1" />
          </div>
          <div style={colGrid}>
            <button style={buttonStyle} onClick={() => fight({ variables: { leftId, rightId } })}>FIGHT!</button>
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
      )}
    </Mutation>
  )
}
