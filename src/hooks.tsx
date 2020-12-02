import * as React from 'react'

import * as Core from '@material-ui/core'

import Clipboard from 'clipboard'

export const useClipboard = (selector: string, text: () => string): [boolean, () => void] => {
  const [state, setState] = React.useState<boolean>(false)

  const reset = () => setState(false)

  React.useEffect(() => {
    const clipboard = new Clipboard(selector, { text })
    clipboard.on('success', () => setState(true))
    return () => clipboard.destroy()
  })

  return [state, reset]
}

export const useRootStyles = Core.makeStyles(theme => ({
  main: {
    position: 'fixed',
    overflowX: 'auto', overflowY: 'hidden',
    top: theme.spacing(8), bottom: 0, left: 0, right: 0
  },
  pre: {
    fontFamily: ','.concat('Consolas', '"Courier New"', 'Courier', 'monospace')
  }
}))

export const useHeaderStyles = Core.makeStyles(theme => ({
  titleSuffixSmall: {
    fontSize: theme.typography.overline.fontSize,
    whiteSpace: 'nowrap',
    paddingLeft: 1,
    flexGrow: 1
  },
  title: {
    whiteSpace: 'nowrap',
    flexGrow: 1
  },
  toolbar: {
    minHeight: theme.spacing(8),
    paddingLeft: theme.spacing(3)
  }
}))

export const useMainStyles = Core.makeStyles(theme => ({
  mainContainer: {
    position: 'absolute',
    width: '100%',
    top: theme.spacing(3), bottom: theme.spacing(3), left: 0, right: 0
  },
  mainContainerSmall: {
    position: 'absolute',
    width: `calc(200% - ${theme.spacing(2.5)}px)`,
    top: theme.spacing(3), bottom: theme.spacing(3), left: 0, right: 0
  },
  mainPaper: {
    wordSpacing: 0,
    padding: theme.spacing(2)
  },
  mainLeft: {
    position: 'absolute',
    overflowX: 'auto', overflowY: 'auto',
    top: 0, bottom: 0, left: theme.spacing(3), width: `calc(50% - ${theme.spacing(8.75)}px)`
  },
  mainRight: {
    position: 'absolute',
    overflowX: 'auto', overflowY: 'auto',
    top: 0, bottom: 0, width: `calc(50% - ${theme.spacing(8.75)}px)`, right: theme.spacing(3)
  }
}))
