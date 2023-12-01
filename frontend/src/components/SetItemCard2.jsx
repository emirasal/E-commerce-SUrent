import * as React from 'react';
import {Link} from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, TextField, CardActions} from '@mui/material';
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

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
      };

    const handleSubmit = () => {
    // Make API request using Axios

        try {

            if (inputValue.trim() !== '') {

                axios.patch(`http://localhost:8080/api/products/update/${item._id}`, { price: inputValue });
                setAlertMessage(<div className="alert alert-success alert-dismissible fade show" role="alert">Price changed successfully</div>);
                window.location.reload(false);
            }
            
        } catch (error) {
            setAlertMessage(<div className="alert alert-danger alert-dismissible fade show" role="alert">Failed to change price</div>);
        }
    
    };
    

    setTimeout(function () {
        setAlertMessage('');
    }, 5000);

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
                            ${item.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <TextField
                        label="New Price"
                        value={inputValue}
                        onChange={handleChange}
                        />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Set New Price
                    </Button>

                </CardActions>
            </Card>
        </ThemeProvider>
    );
}