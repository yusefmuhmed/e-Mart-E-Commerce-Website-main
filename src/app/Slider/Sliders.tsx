"use client"
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Sliders() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Carousel>
    <Carousel.Item className='bg-balck'>
        <img src={require("./clem-onojeghuo-206832-600x500.jpg")} className='w-50 h-50' alt="profff" />
   
    </Carousel.Item>
    <Carousel.Item className='bg-balck'>
    <img src={require("./clem-onojeghuo-206832-600x500.jpg")} className='w-50 h-50' alt="profff" />
    
    </Carousel.Item>
    <Carousel.Item className='bg-balck'>
    <img src={require("./clem-onojeghuo-206832-600x500.jpg")} className='w-50 h-50' alt="profff" />
    </Carousel.Item>
  </Carousel>
  );
}