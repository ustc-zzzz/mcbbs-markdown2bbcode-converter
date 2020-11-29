import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as Styles from '@material-ui/core/styles'

import Marked from 'marked'

import Main from './component/Main'
import Header from './component/Header'

import RendererConfig from './config/Renderer.json'
import ImageCollection from './config/ImageCollection.json'

export interface RenderConfigCollection {
  [key: string]: {
    [key: string]: string
  }
}

export interface RenderConfigItem {
  [key: string]: {
    prefix: string
    suffix: string
  }
}

export interface Renderer {
  [key: string]: (content: string, arg?: { [key: string]: unknown }) => string
}

const textObject = { text: '' }

const muiTheme = Styles.createMuiTheme({
  palette: {
    primary: {
      main: '#2e7d32'
    },
    secondary: {
      main: '#2e7d32'
    }
  }
})

const renderConfigItem: RenderConfigItem = {}

const renderConfigCollection: RenderConfigCollection = RendererConfig

function getRenderer(preset: string) {
  const renderer: Renderer = {}
  const prefixes = renderConfigCollection.prefix
  const suffixes = renderConfigCollection['suffix_' + preset]
  try {
    if (localStorage.renderConfigOverride !== 'true') {
      localStorage.renderConfigOverride = 'false'
      throw new Error()
    }
    Object.assign(suffixes, JSON.parse(localStorage.renderConfig))
  } catch (e) {
    localStorage.renderConfig = JSON.stringify(suffixes)
  }
  for (const key in prefixes) {
    const prefix = prefixes[key]
    const suffix = suffixes[key]
    const func = eval(prefix + '`' + suffix + '`')
    renderConfigItem[key] = { prefix: prefix, suffix: suffix }
    if (key === 'tablecell') {
      renderer[key] = (content, flags = {}) => func(content, flags.header, flags.align)
    } else {
      renderer[key] = func
    }
  }
  return Object.assign(new Marked.Renderer(), renderer)
}

const renderer = getRenderer('default')

function collectConfig(preset?: string) {
  return { renderer: renderConfigItem, text: textObject.text }
}

function onTransform(markdownText: string) {
  return textObject.text = renderer.markdown(Marked(markdownText, {
    renderer: renderer, breaks: false, gfm: true, tables: true, xhtml: false,
    pedantic: false, sanitize: false, smartLists: true, smartypants: false
  }))
}

function body() {
  return (
    <Styles.MuiThemeProvider theme={muiTheme}>
      <Header configCollector={collectConfig} images={ImageCollection} />
      <Main transformer={onTransform} />
    </Styles.MuiThemeProvider>
  )
}

ReactDOM.render(body(), document.body)
