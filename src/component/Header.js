import React from 'react'
import Clipboard from 'clipboard'
import AppBar from 'material-ui/AppBar'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import Config from './Config'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {openClipboardSuccess: false}
  }

  componentDidMount () {
    this.clipboard = new Clipboard('.header-copy-output', {
      text: () => this.props.configCollector()['text']
    })
    this.clipboard.on('success', () => {
      this.setState({openClipboardSuccess: true})
    })
  }

  componentWillUnmount () {
    this.clipboard.destroy()
  }

  render () {
    const configIcon = (
      <div>
        <FlatButton
          label='Copy Output'
          className='header-copy-output show-in-app-bar'
          style={{color: 'rgb(255, 255, 255)', transform: 'translateY(-7px)'}} />
        <Snackbar
          autoHideDuration={4096}
          open={this.state.openClipboardSuccess}
          message={'BBCode output successfully copied'}
          onRequestClose={() => this.setState({openClipboardSuccess: false})} />
        <Config images={this.props.images} configCollector={this.props.configCollector}>
          <IconButton>
            <MoreVertIcon color='rgb(255, 255, 255)' />
          </IconButton>
        </Config>
      </div>
    )

    const title = (
      <div className='title'>
        <div>
          <span className='title-prefix'>MM2BC</span>
          <span className='title-suffix-big'>&nbsp;-&nbsp;MCBBS Markdown To BBCode Converter</span>
        </div>
        <div style={{paddingLeft: '1px'}}>
          <span className='title-suffix-small'>MCBBS Markdown To BBCode Converter</span>
        </div>
      </div>
    )

    return (
      <AppBar title={title} showMenuIconButton={false} iconElementRight={configIcon} />
    )
  }
}

export default Header
