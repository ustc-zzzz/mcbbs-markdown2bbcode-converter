import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import './font/font.css'
import Main from './component/Main'
import Header from './component/Header'

import Marked from 'marked'

const renderer = new Marked.Renderer()

const rendererConfig = {
  markdown: {prefix: '(markdown) => ', suffix: '${markdown.split(\'[br]\').join(\' \')}'},
  code: {prefix: '(code, language) => ', suffix: '[code]${code}[/code]'},
  blockquote: {prefix: '(quote) => ', suffix: '[quote]${quote.split(\'[br]\').join(\'\\n\')}[/quote]'},
  html: {prefix: '(html) => ', suffix: '${html}'},
  heading: {prefix: '(text, level) => ', suffix: '[size=${7-level}][b]${text}[/b][/size]\\n\\n'},
  hr: {prefix: '() => ', suffix: '[hr]\\n'},
  list: {prefix: '(body, ordered) => ', suffix: '[list${ordered?\'=1\':\'\'}]\\n${body}[/list]\\n'},
  listitem: {prefix: '(text) => ', suffix: '[*]${text}\\n'},
  paragraph: {prefix: '(text) => ', suffix: '[size=3]${text.split(\'\\n\').join(\'[br]\').split(\'[br][br]\').join(\'\\n\')}[/size]\\n\\n'},
  table: {prefix: '(header, body) => ', suffix: '[align=center][table=98%]${header}\\n${body}[/table][/align]'},
  tablerow: {prefix: '(content) => ', suffix: '[tr]${content}[/tr]'},
  tablecell: {prefix: '(content, header, align) => ', suffix: '[td]${content}[/td]'},
  strong: {prefix: '(text) => ', suffix: '[b]${text}[/b]'},
  em: {prefix: '(text) => ', suffix: '[i]${text}[/i]'},
  codespan: {prefix: '(code) => ', suffix: '[font=Consolas]${code}[/font]'},
  br: {prefix: '() => ', suffix: '[br][br]'},
  del: {prefix: '(text) => ', suffix: '[s]${text}[/s]'},
  link: {prefix: '(href, title, text) => ', suffix: '[url=${href}]${text}[/url]'},
  image: {prefix: '(href, title, text) => ', suffix: '[img]${href}[/img]'},
  text: {prefix: '(text) => ', suffix: '${text}'}
}

function create (tag) {
  let element = document.createElement(tag)
  document.body.appendChild(element)
  return element
}

function setRenderer () {
  for (let key in rendererConfig) {
    let {prefix, suffix} = rendererConfig[key]
    let func = eval(prefix + '`' + suffix + '`')
    if (key === 'tablecell') {
      renderer[key] = (content, flags) => func(content, flags.header, flags.align)
    } else {
      renderer[key] = func
    }
  }
}

setRenderer()

const transformer = markdownText => renderer.markdown(Marked(markdownText, {
  renderer: renderer, gfm: true, tables: true, xhtml: false, breaks: false,
  pedantic: false, sanitize: false, smartLists: true, smartypants: false
}))

ReactDOM.render(<Header/>, create('header'))
ReactDOM.render(<Main transformer={transformer} />, create('main'))
