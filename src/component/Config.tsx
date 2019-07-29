import * as React from 'react'

import * as Index from '../index'
import * as Style from '../index.css'

import Dialog from 'material-ui/Dialog'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'

interface ConfigProps {
  children: React.ReactElement<IconButton>
  images: {
    [key: string]: string
  }
  configCollector(): {
    renderer: Index.RenderConfigItem
    text: string
  }
}

function Config(props: ConfigProps) {
  const [state, setState] = React.useState({
    renderConfigOpen: false,
    aboutConfigOpen: false
  })

  const collectRendererConfig = () => props.configCollector()['renderer']

  const generateRenderConfigList = () => {
    const result = []
    const rendererConfig = collectRendererConfig()
    for (const key in rendererConfig) {
      const { prefix, suffix } = rendererConfig[key]
      result.push(
        <div key={key} style={{ margin: '2em 0' }}>
          <h3 style={{ fontWeight: 500 }}>{key}</h3>
          <pre>{prefix + '`' + suffix + '`'}</pre>
        </div>
      )
    }
    return result
  }

  const renderConfigActions = [
    //  <FlatButton label='Reset' primary={true} onClick={handleReset}/>,
    <FlatButton
      label='OK'
      primary={true}
      onClick={() => setState({ ...state, renderConfigOpen: false })} />
  ]

  const aboutActions = [
    <FlatButton
      label='OK'
      primary={true}
      onClick={() => setState({ ...state, aboutConfigOpen: false })} />
  ]

  return (
    <div style={{ display: 'inline-block' }}>
      <ConfigMenu
        iconButtonElement={props.children}
        onRenderConfigClick={() => setState({ ...state, renderConfigOpen: true })}
        onAboutClick={() => setState({ ...state, aboutConfigOpen: true })} />
      <Dialog
        modal={false}
        autoScrollBodyContent={true}
        title='Render Configuration'
        actions={renderConfigActions}
        contentStyle={{ width: '100%' }}
        open={state.renderConfigOpen}
        onRequestClose={() => setState({ ...state, renderConfigOpen: false })}>
        {generateRenderConfigList()}
      </Dialog>
      <Dialog
        modal={false}
        actions={aboutActions}
        title='About Project'
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%' }}
        open={state.aboutConfigOpen}
        onRequestClose={() => setState({ ...state, aboutConfigOpen: false })}>
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
        <Watching images={props.images} />
      </Dialog>
    </div>
  )
}

interface WatchingProps {
  images: {
    [key: string]: string
  }
}

function Watching(props: WatchingProps) {
  const [state, setState] = React.useState({
    showHunluan: true,
    showRom718: false
  })

  if (state.showHunluan && state.showRom718) {
    return (
      <div>
        <p><HunluanImg images={props.images} /><Rom718Img images={props.images} /></p>
        <HunluanAndRom718>Hunluan and Rom718 are watching you!</HunluanAndRom718>
      </div>
    )
  } else if (state.showRom718) {
    const onChange = () => setState({ showHunluan: true, showRom718: true })
    return (
      <div>
        <p><Rom718Img images={props.images} /></p>
        <Rom718><span onClick={onChange}>Rom718 is watching you!</span></Rom718>
      </div>
    )
  } else if (state.showHunluan) {
    const onChange = () => setState({ showHunluan: false, showRom718: true })
    return (
      <div>
        <p><HunluanImg images={props.images} /></p>
        <Hunluan><span onClick={onChange}>Hunluan is watching you!</span></Hunluan>
      </div>
    )
  } else {
    return <div></div>
  }
}

interface ConfigMenuProps {
  iconButtonElement: React.ReactElement<IconButton>
  onRenderConfigClick(): void
  onAboutClick(): void
}

function ConfigMenu(props: ConfigMenuProps) {
  const clipboardButtonClass = `${Style.headerCopyOutput} ${Style.showInMenu}`
  return <IconMenu
    iconButtonElement={props.iconButtonElement}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
    <MenuItem className={clipboardButtonClass} primaryText='Copy Output to Clipboard' />
    <MenuItem primaryText='Render Configuration' onClick={props.onRenderConfigClick} />
    <MenuItem primaryText='About Project' onClick={props.onAboutClick} />
  </IconMenu>
}

interface AboutLinkProps {
  children: string | React.ReactElement<{}>
  href: string
}

function AboutLink(props: AboutLinkProps) {
  const style = { fontWeight: 500, color: 'rgba(0, 0, 0, 0.6)' }
  return <a style={style} href={props.href} target='_blank'>{props.children}</a>
}

function AuthorGitHub(props: {}) {
  return <AboutLink href='https://github.com/ustc-zzzz'>@ustc-zzzz</AboutLink>
}

function AuthorMCBBS(props: {}) {
  const href = 'http://www.mcbbs.net/home.php?mod=space&uid=1480882'
  return <AboutLink href={href}>@ustc_zzzz</AboutLink>
}

function SourceCodeGitHub(props: {}) {
  const href = 'https://github.com/ustc-zzzz/mcbbs-markdown2bbcode-converter'
  return <AboutLink href={href}>GitHub</AboutLink>
}

function SourceCodeLicense(props: {}) {
  const href = 'https://github.com/ustc-zzzz/mcbbs-markdown2bbcode-converter/blob/master/LICENSE'
  return <AboutLink href={href}>GPL-3.0 License</AboutLink>
}

function ByReact(props: {}) {
  return <AboutLink href='https://reactjs.org/'>React</AboutLink>
}

function ByMaterialUI(props: {}) {
  return <AboutLink href='http://www.material-ui.com/'>Material UI</AboutLink>
}

function HunluanImg(props: { images: { [key: string]: string } }) {
  return <img height='120px' src={props.images['Hunluan']} />
}

function Hunluan(props: { children: React.ReactElement<{}> }) {
  const href = 'http://www.mcbbs.net/home.php?mod=space&uid=3038'
  return <AboutLink href={href}>{props.children}</AboutLink>
}

function Rom718Img(props: { images: { [key: string]: string } }) {
  return <img height='120px' src={props.images['Rom718']} />
}

function Rom718(props: { children: React.ReactElement<{}> }) {
  const href = 'http://www.mcbbs.net/home.php?mod=space&uid=265600'
  return <AboutLink href={href}>{props.children}</AboutLink>
}

function HunluanAndRom718(props: { children: string }) {
  return <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{props.children}</span>
}

export default Config
