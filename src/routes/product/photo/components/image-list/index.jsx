import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { nanoid } from 'nanoid'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import ImagesListBack from '../fallback'

export default function ImagesList() {
  const { product } = useLoaderData()
  const itemList = ({ images, title }) =>
    images.map((image) => (
      <ImageListItem key={nanoid()}>
        <img
          src={image}
          alt={title}
          style={{ objectFit: 'contain' }}
        />
      </ImageListItem>
    ))

  return (
    <ImageList
      sx={{ mt: 0, height: 400 }}
      cols={1}
      gap={0}
      rowHeight={300}
    >
      <Suspense fallback={<ImagesListBack />}>
        <Await resolve={product}>{itemList}</Await>
      </Suspense>
    </ImageList>
  )
}
