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

  handleChangeToOutput = () => {
    document.getElementsByClassName('main-left')[0].classList.add('show-output')
    document.getElementsByClassName('main-right')[0].classList.add('show-output')
  }

  handleChangeToInput = () => {
    document.getElementById('markdown-input').focus()
    document.getElementsByClassName('main-left')[0].classList.remove('show-output')
    document.getElementsByClassName('main-right')[0].classList.remove('show-output')
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Paper
            className='main-left'
            zDepth={this.state.leftDepth}
            onClick={this.handleChangeToInput}
            onMouseOut={() => this.setState({leftDepth: 1})}
            onMouseOver={() => this.setState({leftDepth: 2})}>
            <InputArea inputId='markdown-input' defaultValue={this.state.input} onChange={this.handleChange} />
          </Paper>
          <Paper
            className='main-right'
            zDepth={this.state.rightDepth}
            onClick={this.handleChangeToOutput}
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
        id={this.props.inputId}
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
