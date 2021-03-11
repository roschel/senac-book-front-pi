import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import imgTeste from '../../assets/images/slide1.jpg'
import imgTeste2 from '../../assets/images/slide2.jpg'
import imgTeste3 from '../../assets/images/slide3.jpg'
import imgTeste4 from '../../assets/images/slide4.jpg'
import imgTeste5 from '../../assets/images/slide5.jpg'

export default class DemoCarousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src={imgTeste} />
                </div>
                <div>
                    <img src={imgTeste2} />
                </div>
                <div>
                    <img src={imgTeste3} />
                </div>
                <div>
                    <img src={imgTeste4} />
                </div>
                <div>
                    <img src={imgTeste5} />
                </div>
            </Carousel>
        );
    }
}