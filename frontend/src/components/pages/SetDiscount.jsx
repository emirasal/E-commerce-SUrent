import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import "./Discount.css";

const SetDiscount = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [discountRate, setDiscountRate] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Fetch the product list from the API
    //fetchProducts();

    axios
      .get("http://localhost:8080/api/products/getAll")
      .then((response) => {
        // Set the products state with the fetched data
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Cannot fetch from database");
      });
  }, []);

  const handleProductCheck = (event) => {
    const productId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the selected product to the list
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      // Remove the deselected product from the list
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleDiscountChange = (event) => {
    setDiscountRate(event.target.value);
  };

  const handleSubmit = () => {
    // Validate the discount ratio
    const parsedRate = parseInt(discountRate, 10);

    if (!(!isNaN(parsedRate) && parsedRate >= 0 && parsedRate <= 100)) {
      setAlertMessage(
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Invalid discount rate!
        </div>
      );
      return;
    }

    // Make API requests to update discount ratios for selected products
    selectedProducts.forEach((productId) => {
      try {
        axios.patch(`http://localhost:8080/api/products/update/${productId}`, {
          Discount_rate: parseInt(discountRate, 10),
        });
        setAlertMessage(
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Discount is set!
          </div>
        );
      } catch (error) {
        setAlertMessage(
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            Failed to set discount rate!
          </div>
        );
      }

      try {
        axios.get(`http://localhost:8080/api/notify/${productId}`);
        setAlertMessage(
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Customers are notified!
          </div>
        );
      } catch (error) {
        console.log(error);
        setAlertMessage(
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            Failed to notify!
          </div>
        );
      }
    });
  };

  setTimeout(function () {
    setAlertMessage("");
  }, 5000);

  return (
    <div className="containerDiscount">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom className="title">
            Select Products
          </Typography>
          {products.map((product) => (
            <FormControlLabel
              key={product._id}
              control={
                <Checkbox
                  checked={selectedProducts.includes(product._id)}
                  onChange={handleProductCheck}
                  value={product._id}
                />
              }
              label={product.Pname}
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom className="title">
            Set Discount Rate
          </Typography>
          <TextField
            label="Rate (%)"
            value={discountRate}
            onChange={handleDiscountChange}
            type="number"
            inputProps={{ min: 0, max: 100 }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="submit-button"
          >
            Set Discount
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SetDiscount;
