import React from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Header extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <AppBar showMenuIconButton={false} title='MCBBS Markdown To BBCode Converter' />
      </MuiThemeProvider>
    )
  }
}

export default Header
