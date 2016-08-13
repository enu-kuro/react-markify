import React, { Component } from 'react'
import { render } from 'react-dom'
import Markify from '../src/Markify.jsx'

class App extends Component {
  render() {
    return (
      <Markify targetWord="JavaScript">
        <span>React is a JavaScript library for building user interfaces.</span>
      </Markify>
    )
  }
}

render(<App />, document.getElementById('root'));
