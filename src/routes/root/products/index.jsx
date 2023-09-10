import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { styleProducts } from './style'

export function GridProducts() {
  const { products } = useLoaderData()

  return (
    <Suspense
      fallback={
        <Box sx={styleProducts.fallbackBox}>
          <LinearProgress />
        </Box>
      }
    >
      <Grid
        container
        spacing={1}
        rowSpacing={6}
      >
        <Await
          resolve={products}
          errorElement={<Box>Error</Box>}
        >
          {(products) =>
            products.map((product) => (
              <Grid
                key={product.id}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
              >
                <Card sx={styleProducts.card}>
                  <CardActionArea href={`/products/${product.id}`}>
                    <CardMedia
                      component='img'
                      height='140'
                      image={product.image}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='div'
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                      >
                        {product.price} $
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          }
        </Await>
      </Grid>
    </Suspense>
  )
}
