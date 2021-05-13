import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import './styles.scss';

type RatingStars = {
  rating?: number;
}

export default function SimpleRating(rating: RatingStars) {
  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend" className="title-star">Avaliação</Typography>
      <Rating
        name="simple-controlled"
        value={rating.rating ? rating.rating : 0}
        precision={0.1}
      />
    </Box>
  );
}
