import React, { Component } from 'react'
import { render } from 'react-dom'
import Markify from '../src/Markify.jsx'

class App extends Component {
  state = {
    targetWord: 'JavaScript',
    inputText: 'React is a JavaScript library for building user interfaces.'
  }
  
  render() {
    return (
      <div>
        <h1><a href="https://github.com/enu-kuro/react-markify" target="_blank">react-markify</a> demo</h1>
        <span>React component to highlight words</span>
        <hr/>
        <h2>Target word</h2>
        <input id="target-word" type="text"
          onChange={e => this.setState({targetWord: e.target.value})}
          defaultValue={this.state.targetWord}
        />
        <hr/>
        <h2>Text</h2>
        <textarea cols="40" rows="5"
          defaultValue={this.state.inputText}
          onChange={e => this.setState({inputText: e.target.value})}
        />
        <hr/>
        <br/>
        <h2>Result</h2>
        <Markify targetWord={this.state.targetWord}>
          {this.state.inputText}
        </Markify>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'));
