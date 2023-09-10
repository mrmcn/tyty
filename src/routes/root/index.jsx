import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material'
import { Outlet } from 'react-router'
import { styleRoot } from './style'

export function Root() {
  return (
    <>
      <Box sx={styleRoot.totalBox}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h4'>SHOP</Typography>
            <ButtonGroup
              variant='contained'
              aria-label='outlined primary button group'
            >
              <Button
                variant='h4'
                color='inherit'
                href={`/homePage`}
              >
                Home
              </Button>
              <Button
                variant='h4'
                color='inherit'
                href={`/products`}
              >
                All products
              </Button>
              <Button
                variant='h4'
                color='inherit'
                href={`/electronics`}
              >
                electronics
              </Button>
              <Button
                variant='h4'
                color='inherit'
                href={`/jewelery`}
              >
                jewelery
              </Button>
              <Button
                variant='h4'
                color='inherit'
                href={`/mensClothing`}
              >
                men's clothind
              </Button>
              <Button
                variant='h4'
                color='inherit'
                href={`/womensClothing`}
              >
                women's clothing
              </Button>
            </ButtonGroup>
            <Box sx={styleRoot.oneBox} />
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  )
}
