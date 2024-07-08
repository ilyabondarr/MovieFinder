import React from 'react';
import Slider from 'slick-carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = ({ children, ...settings }) => {
  return (
    <Slider {...settings}>
      {children}
    </Slider>
  );
};

export default SlickSlider;
