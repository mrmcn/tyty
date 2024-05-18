import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { Fragment } from 'react'
import useModalContext from '../../../../context/modal'
import { itemsSections } from '../../../../data/layout/navBarItems'

export default function NavBar() {
  const { openNavBar, setOpenNavBar } = useModalContext()
  const navList = itemsSections.map((section, i) => (
    <Fragment key={i}>
      {section.map(({ id, ...rest }) => (
        <Item
          key={id}
          {...rest}
        />
      ))}
      <Divider />
    </Fragment>
  ))

  return (
    <Drawer
      open={openNavBar}
      onClose={() => setOpenNavBar(false)}
    >
      <Paper
        component='nav'
        sx={{ width: 250 }}
        onClick={() => setOpenNavBar(false)}
        onKeyDown={() => setOpenNavBar(false)}
      >
        <List aria-label='top menu'>{navList}</List>
      </Paper>
    </Drawer>
  )
}

function Item({ icon, label, route }) {
  const { setOpenCart, setOpenCategoriesMenu } = useModalContext()
  const handleClick = () => {
    switch (label) {
      case 'Catalog': {
        return setOpenCategoriesMenu(true)
      }
      case 'Cart': {
        return setOpenCart(true)
      }
      default:
        return null
    }
  }

  return (
    <ListItem disablePadding>
      <ListItemButton
        aria-label={label}
        href={route}
        onClick={handleClick}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  )
}
