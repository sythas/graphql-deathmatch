import React from 'react'

class FindChallenger extends React.Component {
  state = { id }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { select } = this.props;
    const { id } = this.state;

    return (<input
      value={id}
      onChange={this.handleChange}
      onblur={() => select(id)}
      placeholder={`Enter challenger (ex: facebook/react)`} />
    )
  }
}

export default FindChallenger
