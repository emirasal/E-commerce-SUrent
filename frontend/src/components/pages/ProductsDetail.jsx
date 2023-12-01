import * as React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { Box, Grid, Typography, Button, Rating} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Carousel from 'react-material-ui-carousel';
import Item from '../Items';
import Footer from '../Footer'
import ListReviews from '../ListReviews'

//sx={{ display: { xl: 'none', xs: 'block' } }}


export default function ProductsDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [items, setItems] = useState([]); //for carousel 
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('http://localhost:8080/api/products/prodID/'+id).then(response => {
            setProduct(response.data);
            //setItems(product.images);
            //console.log(response.data);
        });
    }, [id]);

    //FOR RANDOM IMAGES, WILL DELETE 
    /*
    useEffect(() => {
        fetch('https://picsum.photos/v2/list?page=5&limit=10')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            });
    }, []);
    */
    

    if (!product) {
        return 'cannot fetch from database';
    }
    
    const handleAddToCart = async () => {

        let {userId} = localStorage;
        try {
            await axios.post('http://localhost:8080/api/addToCart', {
                productId: product._id
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

    setTimeout(function () {
        setAlertMessage('');
    }, 5000);

    const price = parseFloat(product.price);
    const Discount_rate = parseFloat(product.Discount_rate);

    const calculatedPrice = (price * (1 - Discount_rate / 100)).toFixed(2);

    //HAS INTERNAL CSS, COME BACK!!!
    return(
        <div className="product-details">
            <Grid container 
                style={{ padding: "75px 150px" }} 
                direction="row"
                alignItems="center"
                justifyContent="center">
                <Grid item xs={6}> 
                    <Box> 
                        <Carousel>
                            {product.images.map( item => (
                                <Item item={item} />
                            ))}
                        </Carousel>
                    </Box>
                </Grid>
                <Grid item xs={6}> 
                    <Box p={2} height={"15px"}> 
                        <Grid container>
                            <Grid>
                                <Rating
                                name='custom-no-value'
                                value= {product.rating}
                                precision={0.5}
                                sx={{
                                fontSize: '2rem',
                                }}
                                readOnly
                            />
                        </Grid>
                        <Grid>
                            <Typography variant="h6" color={'grey'}>  ({product.numOfReviews} ratings)</Typography>
                        </Grid>
                        </Grid>

                    </Box>
                    <Box p={2}> 
                        <Typography variant="h2" color={'#242424'}>{product.Pname}</Typography>
                    </Box>
                    <Box p={2}> 
                        <Typography variant="h6" color={'#242424'}>{product.description}</Typography>
                    </Box>
                    <Box p={2} height={"5px"}> 
                        <Typography variant="h7" color={'#242424'}>Distributor: {product.Distribution_inf}</Typography>
                    </Box>
                    <Box p={2} height={"5px"}> 
                        <Typography variant="h7" color={'#242424'}>Warranty: {product.warranty} days</Typography>
                    </Box>

                    <Box p={2} height={"75px"}> 
                        <Grid container>
                            <Grid item p={1}>
                                <Typography variant="h4" color={'#242424'}>${calculatedPrice}</Typography>
                            </Grid>
                            <Grid item p={1}>
                                <Typography variant="h6" color={"primary.light"}>%{product.Discount_rate} off!</Typography>
                            </Grid>
                        </Grid>
                        
                    </Box>
                    <Box p={2} height={"5px"}> 
                        <Typography variant="h7" color={'#242424'}> {product.stock} stock left!</Typography>
                    </Box>
                    <Box p={2}>
                        {product.stock > 0 ? (
                        <Button variant="contained" onClick={handleAddToCart} startIcon={<AddShoppingCartIcon />}>Add to Cart</Button>  
                        ): (
                        <Button variant="contained" color="error" startIcon={<AddShoppingCartIcon />} disabled>Out of Stock</Button>  
                        )
                        }
                    </Box>
                    <div className="alert-message">{alertMessage}</div>
                    
                </Grid>
            </Grid>
            <Grid container
                style={{ padding: "0px 150px", marginTop: 15 }} 
                direction="row"
                alignItems="left"
                justifyContent="left">
                <Grid style={{ width: "100%" }}>
                    <Box p={1}> 
                            <Typography variant="h3" color={'#242424'}>Reviews</Typography>
                    </Box>
                    <Box p={1}> 
                            <Typography variant="h7" color={'#242424'}>{product.reviews.length} reviews</Typography>
                    </Box>
                    <Box p={1}>
                        {product.reviews.length > 0 && (
                                <ListReviews reviews={product.reviews} />
                            )}
                    </Box>
                </Grid>

                
            </Grid>
            <div className='footer'>
                <Footer></Footer>
            </div>

        </div>
 

        
    );
}