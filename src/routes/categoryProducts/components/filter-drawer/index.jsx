import Drawer from '@mui/material/Drawer'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'
import useModalContext from '../../../../context/modal'

const drawerWidth = 240

export default function FilterDrawer({ children }) {
  return (
    <Paper
      component='aside'
      elevation={10}
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label='mailbox folders'
    >
      <MyDrawer>{children}</MyDrawer>
    </Paper>
  )
}

function MyDrawer({ children }) {
  const { filtersOpen, setFiltersOpen, setIsClosingFilters } = useModalContext()
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <Drawer
      variant={matches ? 'permanent' : 'temporary'}
      open={matches ? true : filtersOpen}
      onTransitionEnd={!matches ? () => setIsClosingFilters(false) : null}
      onClose={
        !matches
          ? () => {
              setIsClosingFilters(true)
              setFiltersOpen(false)
            }
          : null
      }
      ModalProps={
        !matches
          ? {
              keepMounted: true,
            }
          : {}
      }
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          position: 'static',
        },
      }}
    >
      {children}
    </Drawer>
  )
}
