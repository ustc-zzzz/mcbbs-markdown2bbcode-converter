import React from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Config from './Config'

class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <MuiThemeProvider>
        <AppBar
          showMenuIconButton={false}
          iconElementRight={<Config configCollector={this.props.configCollector}/>}
          title='MCBBS Markdown To BBCode Converter' />
      </MuiThemeProvider>
    )
  }
}

export default Header
