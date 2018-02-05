import React from 'react'
import Dialog from 'material-ui/Dialog'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import { GridList, GridTile } from 'material-ui/GridList'

class Config extends React.Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  collectRendererConfig = () => this.props.configCollector()['renderer']

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  generateRenderConfigList = () => {
    let result = []
    let rendererConfig = this.collectRendererConfig()
    for (let key in rendererConfig) {
      let {prefix, suffix} = rendererConfig[key]
      result.push(
        <div key={key}>
          <h4>{key}</h4>
          <pre>{prefix + '`' + suffix + '`'}</pre>
        </div>
      )
    }
    return result
  }

  render() {
    console.log(this.collectRendererConfig())
    const actions = [
//    <FlatButton label="Reset" primary={true} onClick={this.handleReset}/>,
      <FlatButton label="OK" primary={true} onClick={this.handleClose}/>
    ]
    return (
      <div>
        <IconButton onClick={this.handleOpen}>
          <FontIcon color='rgb(255, 255, 255)' className='material-icons'>settings</FontIcon>
        </IconButton>
        <Dialog
          modal={false}
          title="Render Configuration"
          actions={actions}
          open={this.state.open}
          autoScrollBodyContent={true}
          contentStyle={{width: '100%'}}
          onRequestClose={this.handleClose}>
          {this.generateRenderConfigList()}
        </Dialog>
      </div>
    );
  }
}

export default Config
