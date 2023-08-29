import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Product } from "./components/Product";

export function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    request();
  }, []);
  const request = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
  };
  const listProducts = products.map((product) => (
    <Product key={product.id} product={product} />
  ));
  return (
    <Grid container rowSpacing={6} spacing={2}>
      {listProducts}
    </Grid>
  );
}
