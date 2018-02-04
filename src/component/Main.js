import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      leftDepth: 1,
      rightDepth: 1,
      input: localStorage.markdownInput || ''
    }
  }

  handleTransform = markdownText => {
    if (this.props.transformer) {
      return this.props.transformer(markdownText)
    } else {
      return markdownText
    }
  }

  handleChange = text => {
    this.setState({input: text})
    localStorage.markdownInput = text
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Paper
            className='main-left'
            zDepth={this.state.leftDepth}
            onMouseOut={() => this.setState({leftDepth: 1})}
            onMouseOver={() => this.setState({leftDepth: 2})}>
            <InputArea defaultValue={this.state.input} onChange={this.handleChange} />
          </Paper>
          <Paper
            className='main-right'
            zDepth={this.state.rightDepth}
            onMouseOut={() => this.setState({rightDepth: 1})}
            onMouseOver={() => this.setState({rightDepth: 2})}>
            <OutputArea value={this.handleTransform(this.state.input)} />
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}

class InputArea extends React.Component {
  handleChange = (event, text) => {
    if (this.props.onChange) {
      this.props.onChange(text)
    }
  }

  render () {
    return (
      <TextField
        fullWidth={true}
        multiLine={true}
        underlineShow={false}
        hintText='Markdown Input'
        onChange={this.handleChange}
        value={this.props.defaultValue}
        textareaStyle={{display: 'block', overflow: 'hidden'}}/>
    )
  }
}

class OutputArea extends React.Component {
  render () {
    return this.props.value ? (
      <p style={{whiteSpace: 'pre', lineHeight: '24px'}}>
        {this.props.value}
      </p>
    ) : (
      <p style={{color: 'rgba(0, 0, 0, 0.3)', lineHeight: '24px', userSelect: 'none'}}>
        BBCode Output
      </p>
    )
  }
}

export default Main
