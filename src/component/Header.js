import React from 'react'
import AppBar from 'material-ui/AppBar'

import Config from './Config'
import IconButton from 'material-ui/IconButton/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

class Header extends React.Component {
  constructor (props) {
    super(props)
    console.log(this)
  }

  render () {
    const configIcon = (
      <Config configCollector={this.props.configCollector}>
        <IconButton><MoreVertIcon color='rgb(255, 255, 255)'/></IconButton>
      </Config>
    )

    return (
      <AppBar
        showMenuIconButton={false}
        iconElementRight={configIcon}
        title='MCBBS Markdown To BBCode Converter' />
    )
  }
}

export default Header
