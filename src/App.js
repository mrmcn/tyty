import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { queryClient, router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { theme } from './theme'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
