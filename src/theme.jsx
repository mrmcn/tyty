import { createTheme } from '@mui/material'
import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props
  return (
    <Link
      ref={ref}
      to={href}
      {...other}
    />
  )
})

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
})
