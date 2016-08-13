import React, {Component} from 'react';

export default class Markify extends React.Component {

  static propTypes = {
    targetWord: React.PropTypes.string,
    className: React.PropTypes.string,
    component: React.PropTypes.any,
    properties: React.PropTypes.object
  }

  static defaultProps = {
    targetWord: null,
    className: 'Markify',
    component: 'mark',
    properties: {}
  }

  parseCounter = 0

  getMatches(string) {
    let matches = []
    const reg = new RegExp(this.props.targetWord, 'g')
    let match
    while (match = reg.exec(string)) {
      matches.push({index: match.index, lastIndex: match.index + this.props.targetWord.length, text: this.props.targetWord})
    }
    return matches
  }

  parseString(string) {
    let elements = []
    if (string === '') {
      return elements
    }

    const matches = this.getMatches(string)
    if (!matches) {
      return string
    }

    let lastIndex = 0
    matches.forEach((match, idx) => {
      // Push the preceding text if there is any
      if (match.index > lastIndex) {
        elements.push(string.substring(lastIndex, match.index))
      }
      // Shallow update values that specified the match
      let props = {key: `parse${this.parseCounter}match${idx}`}
      for (let key in this.props.properties) {
        let val = this.props.properties[key]
        props[key] = val
      }
      elements.push(React.createElement(
        this.props.component,
        props,
        match.text
      ))
      lastIndex = match.lastIndex
    })

    if (lastIndex < string.length) {
      elements.push(string.substring(lastIndex))
    }

    return (elements.length === 1) ? elements[0] : elements
  }

  parse(children) {
    let parsed = children

    if (typeof children === 'string') {
      parsed = this.parseString(children)
    } else if (React.isValidElement(children)) {
      parsed = React.cloneElement(
        children,
        {key: `parse${++this.parseCounter}`},
        this.parse(children.props.children)
      )
    } else if (children instanceof Array) {
      parsed = children.map(child => {
        return this.parse(child)
      })
    }

    return parsed
  }

  render() {
    this.parseCounter = 0
    const parsedChildren = this.props.targetWord ? this.parse(this.props.children) : this.props.children

    return <span className={this.props.className}>{parsedChildren}</span>
  }
}
