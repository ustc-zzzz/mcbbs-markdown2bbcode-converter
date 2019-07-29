import * as React from 'react'

import * as Style from '../index.css'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

interface MainProps {
  transformer: (markdownText: string) => string
}

function Main(props: MainProps) {
  const [state, setState] = React.useState({
    leftDepth: 1,
    rightDepth: 1,
    mainLeftStyle: Style.mainLeft,
    mainRightStyle: Style.mainRight,
    input: localStorage.markdownInput || ''
  })

  const handleTransform = (markdownText: string) => {
    if (props.transformer) {
      return props.transformer(markdownText)
    } else {
      return markdownText
    }
  }

  const handleChange = (text: string) => {
    setState({ ...state, input: text })
    localStorage.markdownInput = text
  }

  const handleChangeToOutput = (event: React.MouseEvent<{}> | React.TouchEvent<{}>) => {
    const mainLeftStyle = `${Style.mainLeft} ${Style.showOutput}`
    const mainRightStyle = `${Style.mainRight} ${Style.showOutput}`
    setState({ ...state, mainLeftStyle: mainLeftStyle, mainRightStyle: mainRightStyle })
    event.stopPropagation()
  }

  const handleChangeToInput = (event: React.MouseEvent<{}> | React.TouchEvent<{}>) => {
    (document.getElementById('markdown-input') as HTMLTextAreaElement).focus()
    setState({ ...state, mainLeftStyle: Style.mainLeft, mainRightStyle: Style.mainRight })
    event.stopPropagation()
  }

  return (
    <div>
      <Paper
        zDepth={state.leftDepth}
        onClick={handleChangeToInput}
        onTouchEnd={handleChangeToInput}
        className={state.mainLeftStyle}
        onMouseOut={() => setState({ ...state, leftDepth: 1 })}
        onMouseOver={() => setState({ ...state, leftDepth: 2 })}>
        <InputArea inputId='markdown-input' defaultValue={state.input} onChange={handleChange} />
      </Paper>
      <Paper
        zDepth={state.rightDepth}
        onClick={handleChangeToOutput}
        onTouchEnd={handleChangeToOutput}
        className={state.mainRightStyle}
        onMouseOut={() => setState({ ...state, rightDepth: 1 })}
        onMouseOver={() => setState({ ...state, rightDepth: 2 })}>
        <OutputArea value={handleTransform(state.input)} />
      </Paper>
    </div>
  )
}

interface InputAreaProps {
  inputId: string
  defaultValue: string
  onChange(text: string): void
}

function InputArea(props: InputAreaProps) {
  const handleChange = (event: React.FormEvent<{}>, text: string) => {
    if (props.onChange) {
      props.onChange(text)
    }
  }

  return (
    <TextField
      fullWidth={true}
      multiLine={true}
      underlineShow={false}
      id={props.inputId}
      hintText='Markdown Input'
      onChange={handleChange}
      value={props.defaultValue}
      textareaStyle={{ display: 'block', overflow: 'hidden' }} />
  )
}

interface OutputAreaProps {
  value: string
}

function OutputArea(props: OutputAreaProps) {
  const hint = 'BBCode Output'
  return props.value ? (
    <p style={{ whiteSpace: 'pre', lineHeight: '24px' }}>{props.value}</p>
  ) : (
    <p style={{ color: 'rgba(0, 0, 0, 0.3)', lineHeight: '24px', userSelect: 'none' }}>{hint}</p>
  )
}

export default Main
