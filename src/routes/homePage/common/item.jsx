import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

export default function Item({ category, primary }) {
  return (
    <ListItem
      disablePadding={true}
      dense
    >
      <ListItemButton
        dense
        href={`/categories/${category}`}
      >
        <ListItemText
          inset
          primary={primary}
        />
      </ListItemButton>
    </ListItem>
  )
}
