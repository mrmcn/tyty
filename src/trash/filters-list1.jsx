import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as JSURL from 'jsurl'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useFetcher, useLoaderData, useSearchParams } from 'react-router-dom'

const inSearchParams = new URLSearchParams()
inSearchParams.set('filters', JSURL.stringify({ brands: [] }))

export default function FiltersList() {
  const [checked, setChecked] = useState([])
  const fetcher = useFetcher()
  const { allBrands } = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams(inSearchParams)
  const handleSubmit = () => {
    const newFilters = { brands: checked }
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('filters', JSURL.stringify(newFilters))
    setSearchParams(newSearchParams, { replace: true })
  }
  const handleToggle = (brand) => {
    const currentIndex = checked.indexOf(brand)
    const newChecked = [...checked]
    if (currentIndex === -1) {
      newChecked.push(brand)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
  }

  return (
    <fetcher.Form onSubmit={handleSubmit}>
      <p>What would you like on your pizza?</p>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {allBrands.map((brandItem) => {
          const labelId = `checkbox-list-label-${brandItem}`
          return (
            <ListItem
              key={nanoid()}
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={() => handleToggle(brandItem)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={checked.indexOf(brandItem) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`Line item ${brandItem + 1}`}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <button>apply</button>
    </fetcher.Form>
  )
}
//   return (
//     <form onChange={handleChange}>
//       <p>Brands</p>

//       <p>
//         {[...brands].map((brand) => (
//           <li key={nanoid()}>
//             <label>
//               <input
//                 defaultChecked={filters.brands.includes({ brand })}
//                 type='checkbox'
//                 name='brands'
//                 value={brand}
//               />
//               {brand}
//             </label>
//             <br />
//           </li>
//         ))}
//       </p>
//       <button>apply</button>
//     </form>
//   )
