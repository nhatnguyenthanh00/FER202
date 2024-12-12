// import React, { useState, useEffect } from "react";
import { Carousel, CarouselItem, Container } from "react-bootstrap";

const Slider = () => {
    return (
        <Container style={{backgroundColor: "white", borderRadius: "5px", paddingTop:"10px"}} className="slideshow">
            <Carousel style={{height: "400px"}}>
                <CarouselItem>
                    <img
                        className="d-block w-100 "
                        src="Images/slider/1.png"
                        alt=""
                        style={{height:"390px", borderRadius:"5px"}}
                    />
                </CarouselItem>
                <CarouselItem>
                    <img
                        className="d-block w-100 "
                        src="Images/slider/2.png"
                        alt=""
                        style={{height:"390px", borderRadius:"5px"}}
                    />
                </CarouselItem>
                <CarouselItem>
                    <img
                        className="d-block w-100 "
                        src="Images/slider/3.png"
                        alt=""
                        style={{height:"390px", borderRadius:"5px"}}
                    />
                </CarouselItem>
                <CarouselItem>
                    <img
                        className="d-block w-100 "
                        src="Images/slider/4.png"
                        alt=""
                        style={{height:"390px", borderRadius:"5px"}}
                    />
                </CarouselItem>
            </Carousel>
        </Container >
    );
};
export default Slider;