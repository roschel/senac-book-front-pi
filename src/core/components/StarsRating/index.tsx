import React from "react";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

type RatingStars = {
    rating: number | undefined;
}

export default function SimpleRating(rating: RatingStars) {
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Avaliação</Typography>
                <Rating
                    name="simple-controlled"
                    value={rating.rating ? rating.rating : 0}
                    precision={0.1}
                />
            </Box>

        </div>
    );

}
