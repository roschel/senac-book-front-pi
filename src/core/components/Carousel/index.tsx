import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import { Image } from '../types/Product';

type ImagesProps = {
	images: Image[] | undefined;
}

const DemoCarousel = ({ images }: ImagesProps) => {

	return (
		<Carousel
			centerMode={true}
			autoPlay={true}
			interval={3000}
			infiniteLoop={true}
			centerSlidePercentage={100}
			stopOnHover={true}
		>
			{
				images &&
				images.map(image => (
					<div>
						<img src={image.imgUrl} alt={image.imgUrl} />
					</div>
				))
			}
		</Carousel>
	)
}

export default DemoCarousel;