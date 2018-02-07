import React from 'react'
import AppBar from 'material-ui/AppBar'

import Config from './Config'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const configIcon = (
      <Config configCollector={this.props.configCollector} images={this.props.images}>
        <IconButton><MoreVertIcon color='rgb(255, 255, 255)'/></IconButton>
      </Config>
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
      <AppBar
        title={title}
        showMenuIconButton={false}
        iconElementRight={configIcon} />
    )
  }
}

export default Header
