import React, { useEffect, useState } from "react";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import makeRequest from "../../../services/api";
import { Product } from '../../../core/components/types/Product'

type Rating = {
    rating: number;
}

export default function SimpleRating({rating}: Rating) {
    const [value, setValue] = useState(1);

    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Avaliação</Typography>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setValue(value);
                    }}
                    precision={0.01}
                />
            </Box>

        </div>
    );

}
