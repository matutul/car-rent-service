import './Header.css'
import React from 'react';
import Navbar from '../../Shared/Navbar/Navbar/Navbar';
import { Carousel } from 'react-bootstrap';

const Header = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="header">
                <Carousel className="carousel-div" fade>
                    <Carousel.Item className="carousel-item-1" interval={4000}>
                        {/* <img
                            className=""
                            src="holder.js/800x400?text=First slide&bg=373940"
                            alt="First slide"
                        /> */}
                        <div className="carousel-text d-flex justify-content-center align-items-center text-left">
                            <div className="container">
                                <h3>First Slide Label</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam placeat non delectus tempora nobis saepe fuga omnis inventore quo vero!</p>
                            </div>
                        </div>
                        {/* <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item className="carousel-item-2" interval={4000}>
                        {/* <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=First slide&bg=373940"
                            alt="Second slide"
                        /> */}
                        <div className="carousel-text d-flex justify-content-center align-items-center text-left">
                            <div className="container">
                                <h3>First Slide Label</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam placeat non delectus tempora nobis saepe fuga omnis inventore quo vero!</p>
                            </div>
                        </div>
                        {/* <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item className="carousel-item-3" interval={4000}>
                        {/* <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=First slide&bg=373940"
                            alt="Third slide"
                        /> */}
                        <div className="carousel-text d-flex justify-content-center align-items-center text-right">
                            <div className="container">
                                <h3>First Slide Label</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam placeat non delectus tempora nobis saepe fuga omnis inventore quo vero!</p>
                            </div>
                        </div>
                        {/* <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
};

export default Header;