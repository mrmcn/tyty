import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useLoaderData } from 'react-router-dom'
import { styleProduct } from './style'

export function Product() {
  const product = useLoaderData()

  return (
    <>
      <Box
        sx={{ flexGrow: 3 }}
        component='article'
      >
        <Card
          sx={styleProduct.card}
          component='section'
        >
          <CardMedia
            sx={styleProduct.cardedia}
            image={product.image}
            title={product.title}
          />
          <CardContent>
            <Typography
              variant='h6'
              component='div'
            >
              {product.title}
            </Typography>
            <Typography
              variant='body1'
              component='div'
            >
              {product.price} $
            </Typography>{' '}
          </CardContent>
        </Card>
        <Typography
          variant='h5'
          component='section'
        >
          {product.description}
        </Typography>
      </Box>
    </>
  )
}
