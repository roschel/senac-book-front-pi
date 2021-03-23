import React, { Component, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import imgTeste2 from '../../assets/images/slide2.jpg'
import { Product } from '../types/Product';

type Props = {
    product: Product;
}

const DemoCarousel = ({ product }: Props) => {
    
    const x = product?.images.map(image => image.imgUrl)
    
    return (
        <Carousel>
            <div>
                <img src={x.toString()} alt=""/>
            </div>
            <div>
                <img src={imgTeste2} alt=""/>
            </div>
        </Carousel>
    )
}

export default DemoCarousel;