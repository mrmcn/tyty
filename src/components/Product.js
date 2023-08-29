import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions, Grid } from "@mui/material";

export function Product({ product }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={{ maxWidth: 345, height: "100%" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={product.image}
          title={product.title}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography variant="body1" component="div">
            {product.price} $
          </Typography>
        </CardContent>
        <CardActions>
          <Button>bay</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
