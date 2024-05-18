const toSort = (filters) => {
  if (filters.sort === 1) {
    return ab
  } else if (filters.sort === 2) {
    return ba
  } else if (filters.sort === 3) {
    return maxMin
  } else {
    return minMax
  }
}

const allData = (formData) => {
  const data = Array.from(formData.entries())
    .filter(([key]) => key !== 'userId')
    .map(mainMap)
    .reduce(mainReduce, {})
  return data
}

export { toSort, allData }

const ba = (a, b) => {
  let x = a.title.toLowerCase()
  let y = b.title.toLowerCase()
  if (x < y) {
    return -1
  }
  if (x > y) {
    return 1
  }
  return 0
}
const ab = (a, b) => {
  let y = a.title.toLowerCase()
  let x = b.title.toLowerCase()
  if (x < y) {
    return -1
  }
  if (x > y) {
    return 1
  }
  return 0
}
const minMax = (a, b) => a.price - b.price
const maxMin = (a, b) => b.price - a.price

const mainMap = ([key, value]) => {
  const keyName = key.split('.')
  if (keyName.length === 1) {
    return [key, value]
  } else {
    return [keyName[0], { [keyName[1]]: value }]
  }
}

const mainReduce = (acc, curr) => {
  if (acc[curr[0]] === undefined) {
    return { ...acc, [curr[0]]: curr[1] }
  } else {
    return { ...acc, [curr[0]]: { ...acc[curr[0]], ...curr[1] } }
  }
}
