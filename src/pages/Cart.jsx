import React from "react";
import Container from "@Mui/material/Container";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { getSubtotal } from "../utils";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../feature/cart-slice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart?.value);
  const subtotal = getSubtotal(cart)?.toFixed(2);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function updateQuantity(e, { product, quantity }) {
    const updatedQuantity = e.target.valueAsNumber;
    if (updatedQuantity < quantity) {
      dispatch(removeFromCart({ product }));
    } else if (updatedQuantity) {
      dispatch(addToCart({ product }));
    }
  }

  function goToHome() {
    navigate("/");
  }

  function checkoutItems() {
    navigate("/checkout");
  }
  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cart?.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product;
            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    display: "flex",
                    py: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                    alt={title}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography variant="h5">{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          sx={{
                            width: theme.spacing(8),
                          }}
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                          id={`${id}-product-id`}
                          type="number"
                          variant="standard"
                          label="Quantity"
                          value={quantity}
                          onChange={(e) => {
                            console.log("new", e.target.valueAsNumber);
                            updateQuantity(e, { product, quantity });
                          }}
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {getSubtotal([{ product, quantity }])?.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Card
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h4">Subtotal</Typography>
              <Typography variant="h5">{subtotal}</Typography>
              {subtotal > 0 ? (
                <Button variant="contained" onClick={checkoutItems}>
                  Buy now
                </Button>
              ) : (
                <Button variant="contained" onClick={goToHome}>
                  Shop products
                </Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
