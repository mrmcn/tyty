import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useFetcher } from 'react-router-dom'

export default function Item({ label, route, icon, open, routeMatch }) {
  const fetcher = useFetcher()
  const isLoggingOut = fetcher.formData != null
  const currentButton = route === routeMatch?.pattern?.path

  return (
    <Box
      component={fetcher.Form}
      method='post'
      action='/logout'
      disabled={label !== 'Logout'}
    >
      <ListItem
        disablePadding
        sx={{
          display: 'block',
          backgroundColor: currentButton ? 'aquamarine' : 'inherit',
        }}
      >
        <ListItemButton
          component={label === 'Logout' ? 'button' : ListItemButton}
          aria-label={label}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
          href={route}
          type={label === 'Logout' ? 'submit' : null}
          disabled={isLoggingOut}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={label}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </Box>
  )
}
