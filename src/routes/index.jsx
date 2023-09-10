import { QueryClient } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router-dom'
import { Root } from './root'
import { GridProducts } from './root/products'
import { Product } from './root/product'
import { HomePage } from './root/home'
import { loader as loaderProducts } from './root/products/loader'
import { loader as loaderProduct } from './root/product/loader'
import ErrorPage from '../common/errorPage'
import { Products as ProductsElectronics } from './root/electronics'
import { loader as loaderElectronics } from './root/electronics/loader'
import { Products as Jewelery } from './root/jewelery'
import { loader as loaderJewelery } from './root/jewelery/loader'
import { loader as loaderMensClothing } from './root/mensClothing/loader'
import { Products as ProductsMensClothing } from './root/mensClothing'
import { Products as ProductsWomensClothing } from './root/womensClothing'
import { loader as loaderWomensClothing } from './root/womensClothing/loader'

export const queryClient = new QueryClient()
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'homePage', element: <HomePage /> },
      { path: 'products', element: <GridProducts />, loader: loaderProducts },
      {
        path: 'products/:id',
        element: <Product />,
        loader: loaderProduct,
      },
      {
        path: 'electronics',
        element: <ProductsElectronics />,
        loader: loaderElectronics,
      },
      {
        path: 'jewelery',
        element: <Jewelery />,
        loader: loaderJewelery,
      },
      {
        path: 'mensClothing',
        element: <ProductsMensClothing />,
        loader: loaderMensClothing,
      },
      {
        path: 'womensClothing',
        element: <ProductsWomensClothing />,
        loader: loaderWomensClothing,
      },
    ],
  },
])
