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

export default function MultiActionAreaCard2({item}) {
    const price = parseFloat(item.price);
    const Discount_rate = parseFloat(item.Discount_rate);

    const calculatedPrice = (price * (1 - Discount_rate / 100)).toFixed(2);
    return (

        <ThemeProvider theme={theme}>
            
            <Card sx={{maxWidth: 345}}>
                <CardActionArea component={Link} to={{pathname: `/products2/${item._id}`}}>
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
            </Card>
        </ThemeProvider>
    );
}