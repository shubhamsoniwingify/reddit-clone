import React from 'react'

class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Shubham'
    }
  }

  render () {
    return (
      <div>Developer's name is { this.state.name }</div>
    )
  }
}

export default Test;