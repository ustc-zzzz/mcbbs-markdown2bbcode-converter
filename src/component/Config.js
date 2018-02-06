import React from 'react'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import { GridList, GridTile } from 'material-ui/GridList'

const ConfigMenu = props => (
  <IconMenu
    iconButtonElement={props.iconButtonElement}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
    <MenuItem primaryText="Render Configuration" onClick={props.onRenderConfigClick} />
    <MenuItem primaryText="About This Project" onClick={props.onAboutClick} />
  </IconMenu>
)

const AboutLink = props => {
  const style = {fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)'}
  return <a style={style} href={props.href} target='_blank'>{props.children}</a>
}

const AuthorGitHub = props => (
  <AboutLink href='https://github.com/ustc-zzzz'>@ustc-zzzz</AboutLink>
)

const AuthorMCBBS = props => (
  <AboutLink href='http://www.mcbbs.net/home.php?mod=space&uid=1480882'>@ustc_zzzz</AboutLink>
)

const SourceCodeGitHub = props => {
  const href = 'https://github.com/ustc-zzzz/mcbbs-markdown2bbcode-converter'
  return <AboutLink href={href}>GitHub</AboutLink>
}

const SourceCodeLicense = props => {
  const href = 'https://github.com/ustc-zzzz/mcbbs-markdown2bbcode-converter/blob/master/LICENSE'
  return <AboutLink href={href}>GPL-3.0 License</AboutLink>
}

const ByReact = props => (
  <AboutLink href='https://reactjs.org/'>React</AboutLink>
)

const ByMaterialUI = props => (
  <AboutLink href='http://www.material-ui.com/'>Material UI</AboutLink>
)

const HunluanImg = props => (
  <img height='120px' src='http://www.mcbbs.net/uc_server/avatar.php?uid=3038&size=middle' />
)

const Hunluan = props => (
  <AboutLink href='http://www.mcbbs.net/home.php?mod=space&uid=3038'>{props.children}</AboutLink>
)

const Rom718Img = props => (
  <img height='120px' src='http://www.mcbbs.net/uc_server/avatar.php?uid=265600&size=middle' />
)

const Rom718 = props => (
  <AboutLink href='http://www.mcbbs.net/home.php?mod=space&uid=265600'>{props.children}</AboutLink>
)

const HunluanAndRom718 = props => (
  <span style={{color: 'rgba(0, 0, 0, 0.6)'}}>{props.children}</span>
)

class Watching extends React.Component {
  constructor (props) {
    super(props)
    this.state = {showHunluan: true, showRom718: false}
  }

  render () {
    if (this.state.showHunluan && this.state.showRom718) {
      return (
        <div>
          <p><HunluanImg /><Rom718Img /></p>
          <HunluanAndRom718>Hunluan and Rom718 are watching you!</HunluanAndRom718>
        </div>
      )
    } else if (this.state.showRom718) {
      const onChange = () => this.setState({showHunluan: true, showRom718: true})
      return (
        <div>
          <p><Rom718Img /></p>
          <Rom718><span onClick={onChange}>Rom718 is watching you!</span></Rom718>
        </div>
      )
    } else if (this.state.showHunluan) {
      const onChange = () => this.setState({showHunluan: false, showRom718: true})
      return (
        <div>
          <p><HunluanImg /></p>
          <Hunluan><span onClick={onChange}>Hunluan is watching you!</span></Hunluan>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

class Config extends React.Component {
  constructor (props) {
    super(props)
    this.state = {renderConfigOpen: false, aboutConfigOpen: false}
  }

  collectRendererConfig = () => this.props.configCollector()['renderer']

  generateRenderConfigList = () => {
    let result = []
    let rendererConfig = this.collectRendererConfig()
    for (let key in rendererConfig) {
      let {prefix, suffix} = rendererConfig[key]
      result.push(
        <div key={key} style={{margin: '2em 0'}}>
          <h3 style={{fontWeight: '500'}}>{key}</h3>
          <pre>{prefix + '`' + suffix + '`'}</pre>
        </div>
      )
    }
    return result
  }

  render() {
    const renderConfigActions = [
//    <FlatButton label="Reset" primary={true} onClick={this.handleReset}/>,
      <FlatButton
        label="OK"
        primary={true}
        onClick={() => this.setState({renderConfigOpen: false})} />
    ]
    const aboutActions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={() => this.setState({aboutConfigOpen: false})} />
    ]
    return (
      <div>
        <ConfigMenu
          iconButtonElement={this.props.children}
          onRenderConfigClick={() => this.setState({renderConfigOpen: true})}
          onAboutClick={() => this.setState({aboutConfigOpen: true})} />
        <Dialog
          modal={false}
          autoScrollBodyContent={true}
          title="Render Configuration"
          actions={renderConfigActions}
          contentStyle={{width: '100%'}}
          open={this.state.renderConfigOpen}
          onRequestClose={() => this.setState({renderConfigOpen: false})}>
          {this.generateRenderConfigList()}
        </Dialog>
        <Dialog
          modal={false}
          actions={aboutActions}
          title="About This Project"
          autoScrollBodyContent={true}
          contentStyle={{width: '100%'}}
          open={this.state.aboutConfigOpen}
          onRequestClose={() => this.setState({aboutConfigOpen: false})}>
          <p>
            Author:&nbsp;zzzz
            (Github:&nbsp;<AuthorGitHub />,&nbsp;MCBBS:&nbsp;<AuthorMCBBS />).
          </p>
          <p>
            Source Code on <SourceCodeGitHub />, under <SourceCodeLicense />.
          </p>
          <p>
            Powered by <ByReact /> and <ByMaterialUI />.
          </p>
          <Watching />
        </Dialog>
      </div>
    )
  }
}

export default Config
