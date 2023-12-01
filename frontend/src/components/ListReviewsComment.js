import React from 'react'
import { Box, Rating, Button } from "@mui/material";
import { Grid, Paper } from "@mui/material";

const ListReviews2 = ({ reviews, handleApproveReview }) => {

  return (
    <Box style={{ width: "100%" }}>
      {reviews && reviews.map(review => (
        <Paper key={review._id} style={{ padding: "20px 20px", marginTop: 15, width: "100%" }} elevation={3}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid justifyContent="left" item xs zeroMinWidth>
              {review.approved ? (
                <h5 style={{ color: "green", margin: 1, textAlign: "left" }}>Approved</h5>
              ) : (
                <h5 style={{ color: "red", margin: 1, textAlign: "left" }}>Not Approved</h5>
              )}
              <h5 style={{ margin: 1, textAlign: "left" }}>by {review.user_name}</h5>
              <Rating
                name='custom-no-value'
                value={review.rating}
                precision={0.5}
                sx={{
                  fontSize: '1rem',
                }}
                readOnly
              />

              <hr />

              <p style={{ textAlign: "left", wordBreak: "break-word" }}>
                {review.comment}
              </p>

              {!review.approved && (
                <Button onClick={() => handleApproveReview(review._id)} variant="contained" color="primary">
                  Approve
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  )
}

export default ListReviews2
