import * as JSURL from 'jsurl'
import { nanoid } from 'nanoid'
import { Suspense } from 'react'
import { Await, Form, useLoaderData } from 'react-router-dom'
import Fallback from './fallback'

export default function FiltersList({ searchParams, setSearchParams }) {
  const { allBrands } = useLoaderData()
  const paramValue = searchParams.get('filters')
  const filters = JSURL.parse(paramValue)
  function handleChange(e) {
    const formData = new FormData(e.currentTarget)
    const newFilters = {
      brands: formData.getAll('brands'),
    }
    const allFilters = { ...filters, ...newFilters }
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('filters', JSURL.stringify(allFilters))
    setSearchParams(newSearchParams)
  }

  return (
    <Form
      method='get'
      onChange={handleChange}
    >
      <ul>
        <Suspense fallback={<Fallback />}>
          <Await resolve={allBrands}>
            {(res) =>
              res.map((brand) => (
                <li key={nanoid()}>
                  <label>
                    <input
                      defaultChecked={filters?.brands?.includes(brand) || false}
                      type='checkbox'
                      name='brands'
                      value={brand}
                    />
                    {brand}
                  </label>
                  <br />
                </li>
              ))
            }
          </Await>
        </Suspense>
      </ul>
      <button type='submit'>Search</button>
    </Form>
  )
}
