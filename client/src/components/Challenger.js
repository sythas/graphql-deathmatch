import React from 'react';

const style = {
  display: 'grid',
  gridGap: '10px',
  gridTemplateColumns: '100px 1fr',
  gridTemplateAreas: `
  img title
  img desc`
}

const Challenger = (challenger) => (
  <div style={style}>
    <img src={challenger.avatarUrl} alt={challenger.id} />
    <h3>{challenger.id}</h3>
    <p>{challenger.description}</p>
  </div >
)

export default Challenger;
