import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import IconButton from '@mui/material/IconButton'
import { nanoid } from 'nanoid'
import { Suspense, useState } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import Fallback from './fallback'

export default function BrandsFilter({ filters }) {
  const { allBrands } = useLoaderData()
  const [open, setOpen] = useState(false)
  const filtersList = (res) =>
    res.map((filter) => (
      <FilterItem
        key={nanoid()}
        filter={filter}
        filters={filters}
      />
    ))

  return (
    <Suspense fallback={<Fallback />}>
      <Await resolve={allBrands}>
        {(res) => (
          <FormControl
            sx={{ m: 3 }}
            component='fieldset'
            variant='standard'
          >
            <FormLabel
              component='legend'
              onClick={() => setOpen(!open)}
            >
              Brands {res.length}{' '}
              <IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
            </FormLabel>
            <Collapse
              in={open}
              timeout='auto'
              unmountOnExit
            >
              <FormGroup>{filtersList(res)}</FormGroup>
            </Collapse>
          </FormControl>
        )}
      </Await>
    </Suspense>
  )
}

function FilterItem({ filter, filters }) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={filters?.brands?.includes(filter) || false}
          name='brands'
          value={filter}
        />
      }
      label={filter}
    />
  )
}
