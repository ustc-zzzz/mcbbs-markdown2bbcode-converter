import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import './font/font.css'
import RendererConfig from './config/Renderer.json'

import Marked from 'marked'
import Main from './component/Main'
import Header from './component/Header'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { green700, grey600 } from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const muiTheme = getMuiTheme({
  palette: {primary1Color: green700, primary2Color: green700, primary3Color: grey600},
  appBar: {height: 64}
})

const renderer = new Marked.Renderer()

function setRenderer (preset) {
  preset = preset || 'default'
  for (let key in RendererConfig.prefix) {
    let prefix = RendererConfig.prefix[key]
    let suffix = RendererConfig['suffix_' + preset][key]
    let func = eval(prefix + '`' + suffix + '`')
    if (key === 'tablecell') {
      renderer[key] = (content, flags) => func(content, flags.header, flags.align)
    } else {
      renderer[key] = func
    }
  }
}

function collectConfig (preset) {
  let result = {}
  preset = preset || 'default'
  for (let key in RendererConfig.prefix) {
    let prefix = RendererConfig.prefix[key]
    let suffix = RendererConfig['suffix_' + preset][key]
    result[key] = {prefix: prefix, suffix: suffix}
  }
  localStorage.removeItem('renderConfig')
  return {renderer: result}
}

setRenderer()

function onTransform (markdownText) {
  return renderer.markdown(Marked(markdownText, {
    renderer: renderer, breaks: false, gfm: true, tables: true, xhtml: false,
    pedantic: false, sanitize: false, smartLists: true, smartypants: false
  }))
}

function header () {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Header configCollector={collectConfig} />
    </MuiThemeProvider>
  )
}

function main () {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Main transformer={onTransform} />
    </MuiThemeProvider>
  )
}

ReactDOM.render(header(), document.getElementsByTagName('header')[0])
ReactDOM.render(main(), document.getElementsByTagName('main')[0])
