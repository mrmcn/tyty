import { queryClient } from '../..'

export const loader = ({ params }) => {
  return queryClient.fetchQuery({
    queryKey: ['product', 'id'],
    queryFn: async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${params.id}`,
      )
      return response.json()
    },
  })
}
