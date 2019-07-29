import * as React from 'react'
import * as Clipboard from 'clipboard'

import * as Index from '../index'
import * as Style from '../index.css'

import AppBar from 'material-ui/AppBar'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

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

  const configIcon = (
    <div>
      <FlatButton
        label='Copy Output'
        className={clipboardButtonClass}
        style={{ color: 'rgb(255, 255, 255)', transform: 'translateY(-7px)' }} />
      <Snackbar
        autoHideDuration={4096}
        open={state.openClipboardSuccess}
        message={'BBCode output successfully copied'}
        onRequestClose={() => setState({ openClipboardSuccess: false })} />
      <Config images={props.images} configCollector={props.configCollector}>
        <IconButton>
          <MoreVertIcon color='rgb(255, 255, 255)' />
        </IconButton>
      </Config>
    </div>
  )

  const title = (
    <div className={Style.title}>
      <div>
        <span>MM2BC</span>
        <span className={Style.titleSuffixBig}>&nbsp;-&nbsp;MCBBS Markdown To BBCode Converter</span>
      </div>
      <div style={{ paddingLeft: '1px' }}>
        <span className={Style.titleSuffixSmall}>MCBBS Markdown To BBCode Converter</span>
      </div>
    </div>
  )

  return (
    <AppBar title={title} showMenuIconButton={false} iconElementRight={configIcon} />
  )
}

export default Header
