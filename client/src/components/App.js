import React from 'react';

import Header from './Header'
import Battle from './Battle'
import Staging from './Staging'
class App extends React.Component {
  state = {
    left: null,
    right: null
  }

  fetchChallenger = side => async id => {
    const [owner, name] = id.split('/')
    // const challenger = await client.query(GET_CHALLENGER, { owner, name })
    // this.setState({ [side]: challenger })
  }

  render() {
    const staging = window.location.pathname === '/'

    return (
      <>
        <Header />
        {staging && <Staging />}
        {!staging && <Battle />}
      </>
    )
  }
}

export default App
