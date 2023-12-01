import React from 'react'
import {Box, Rating} from "@mui/material";
import { Grid, Paper } from "@mui/material";

const ListReviews = ({ reviews }) => {
    return (
        <Box style={{ width: "100%" }}>
            {reviews && reviews.map(review => review.approved && (
                    <Paper key={review._id} style={{ padding: "20px 20px", marginTop: 15, width: "100%" }} elevation={3} >
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h5 style={{ margin: 1, textAlign: "left" }}>by {review.user_name}</h5>
                                <Rating
                                name='custom-no-value'
                                value= {review.rating}
                                precision={0.5}
                                sx={{
                                fontSize: '1rem',
                                }}
                                readOnly/>

                                <hr/>


                                <p style={{ textAlign: "left", wordBreak: "break-word" }}>
                                {review.comment}{" "}
                                            </p>

                            </Grid>

                        </Grid>
                    </Paper>
                
            ))}
        </Box>
    )
}

export default ListReviews