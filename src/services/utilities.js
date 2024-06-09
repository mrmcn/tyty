const calculations = (value) => {
  const totalPrice =
    Math.round(
      value
        .map((product) => product.price * product.quantity)
        .reduce((accumulator, currentValue) => accumulator + currentValue) *
        100,
    ) / 100
  const totalPriceWithDiscount =
    Math.round(
      value
        .map((product) => product.discountedPrice * product.quantity)
        .reduce((accumulator, currentValue) => accumulator + currentValue) *
        100,
    ) / 100
  const totalDiscount =
    Math.round((totalPrice - totalPriceWithDiscount) * 100) / 100
  return { totalPrice, totalPriceWithDiscount, totalDiscount }
}

export { calculations }
