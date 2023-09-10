import { defer } from 'react-router'
import { queryClient } from '..'

export const loader = () => {
  return defer({
    products: queryClient.fetchQuery({
      queryKey: ['categories'],
      queryFn: async () => {
        const response = await fetch(
          'https://fakestoreapi.com/products/categories',
        )
        return response.json()
      },
    }),
  })
}
