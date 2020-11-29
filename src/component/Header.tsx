import * as React from 'react'

import * as Index from '../index'
import * as Style from '../index.css'

import * as Core from '@material-ui/core'

import Clipboard from 'clipboard'

import Config from './Config'

interface HeaderProps {
  images: {
    [key: string]: string
  }
  configCollector(): {
    renderer: Index.RenderConfigItem
    text: string
  }
}

function Header(props: HeaderProps) {
  const [state, setState] = React.useState({
    openClipboardSuccess: false
  })

  React.useEffect(() => {
    const options = { text: () => props.configCollector()['text'] }
    const clipboard = new Clipboard(`.${Style.headerCopyOutput}`, options)

    clipboard.on('success', () => setState({ openClipboardSuccess: true }))

    return () => clipboard.destroy()
  })

  const clipboardButtonClass = `${Style.headerCopyOutput} ${Style.showInAppBar}`

  return (
    <Core.AppBar position='fixed'>
      <Core.Toolbar style={{ minHeight: '64px', paddingLeft: '24px' }}>
        <Core.Typography variant='h5' style={{ flexGrow: 1 }}>
          <span>MM2BC</span>
          <div className={Style.titleSuffixSmall}>MCBBS Markdown To BBCode Converter</div>
          <span className={Style.titleSuffixBig}>&nbsp;-&nbsp;MCBBS Markdown To BBCode Converter</span>
        </Core.Typography>
        <Core.Button color='inherit' className={clipboardButtonClass}>Copy Output</Core.Button>
        <Core.Snackbar
          autoHideDuration={4096}
          open={state.openClipboardSuccess}
          message={'BBCode output successfully copied'}
          onClose={() => setState({ openClipboardSuccess: false })} />
        <Config images={props.images} configCollector={props.configCollector} />
      </Core.Toolbar>
    </Core.AppBar>
  )
}

export default Header
