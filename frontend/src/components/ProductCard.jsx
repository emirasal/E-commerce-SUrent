import * as React from 'react';
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material';
import amber from "@mui/material/colors/amber"
import axios from "axios";
import {useState} from "react";
import './product-card.css'

const theme = createTheme({
    palette: {
        primary: amber,
    },
});

export default function MultiActionAreaCard({item}) {

    const [alertMessage, setAlertMessage] = useState("");
    const handleAddToCart = async () => {

        let {userId} = localStorage;
        try {
            await axios.post('http://localhost:8080/api/addToCart', {
                productId: item._id
            }, {
                headers: {
                    userId: userId,
                }
            });

            setAlertMessage(<div className="alert alert-success alert-dismissible fade show" role="alert">Product added
                to cart successfully!</div>);
        } catch (error) {
            setAlertMessage(<div className="alert alert-danger alert-dismissible fade show" role="alert">Failed to add
                product to cart.</div>);
        }
    }

    const handleAddToWishlist = async () => {

        let {userId} = localStorage;
        try {
            await axios.post('http://localhost:8080/api/addToWishlist', {
                productId: item._id
            }, {
                headers: {
                    userId: userId,
                }
            });

            setAlertMessage(<div className="alert alert-success alert-dismissible fade show" role="alert">Product added
                to wishlist successfully!</div>);
        } catch (error) {
            setAlertMessage(<div className="alert alert-danger alert-dismissible fade show" role="alert">Failed to add
                product to wishlist.</div>);
        }
    }

    setTimeout(function () {
        setAlertMessage('');
    }, 5000);

    const price = parseFloat(item.price);
    const Discount_rate = parseFloat(item.Discount_rate);

    const calculatedPrice = (price * (1 - Discount_rate / 100)).toFixed(2);

    return (

        <ThemeProvider theme={theme}>
            <div className="alert-message">{alertMessage}</div>
            <Card sx={{maxWidth: 345}}>
                <CardActionArea component={Link} to={{pathname: `/products/${item._id}`}}>
                    <CardMedia
                        component="img"
                        height="210"
                        image={item.images[0]}
                        alt="Product"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.Pname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ${calculatedPrice}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                {item.stock > 0 ? (
                        <Button variant="contained" onClick={handleAddToCart} >Add to Cart</Button>  
                        ): (
                        <Button variant="contained" color="error" disabled>Out of Stock</Button>  
                        )
                }
                
                        <Button variant="contained" onClick={handleAddToWishlist} >Wishlist</Button>  
                </CardActions>
            </Card>
        </ThemeProvider>
    );
}