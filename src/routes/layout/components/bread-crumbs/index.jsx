import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { nanoid } from 'nanoid'
import { Suspense } from 'react'
import { Await, useMatches } from 'react-router-dom'

const translations = {
  '': 'Home',
}

export default function BreadCrumbs() {
  const matches = useMatches()
  const crumbs = matches
    .filter(({ handle }) => handle?.crumb !== false)
    .map(({ handle, data, pathname }, index, array) => {
      const segment = pathname.split('/').at(-1)
      const last = index === array.length - 1

      return (
        <Crumb
          key={nanoid()}
          to={last ? undefined : pathname}
        >
          {typeof handle?.crumb === 'function' ? (
            <Suspense fallback={<></>}>
              <Await resolve={Promise.all(Object.values(data))}>
                {handle.crumb}
              </Await>
            </Suspense>
          ) : (
            translations[segment] ?? segment
          )}
        </Crumb>
      )
    })

  return <Breadcrumbs aria-label='breadcrumb'>{crumbs}</Breadcrumbs>
}

const Crumb = ({ to, ...rest }) =>
  to ? (
    <Link
      to={to}
      underline='hover'
      color='inherit'
      {...rest}
    />
  ) : (
    <Typography {...rest} />
  )
