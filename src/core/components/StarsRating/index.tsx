import React, { useEffect, useState } from "react";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types'

type Rating = {
    rating: number;
}

export default function SimpleRating({rating}: Rating) {
    const [value, setValue] = useState(1);
    console.log(rating)
    useEffect(() => {
        setValue(rating)
    }, [])
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Avaliação</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    precision={0.1}
                />
            </Box>

        </div>
    );

}
