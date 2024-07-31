import React, { useContext, useEffect, useState, useRef } from "react";
import ButtonPremieres from "./ButtonPremieres.jsx";
import FetchRequests from "./FetchRequests.jsx";
import Slider from "react-slick";
import prevArrow from "../assets/prev.png";
import { FilmContext } from "./App.jsx";

function News() {
  const { error, isLoading, setIsLoading, fetchMediaPosts, fetchPremieres } =
  FetchRequests();
  const { newsItems, premieresItem } = useContext(FilmContext);
  const [currentSlide, setcurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  useEffect(() => {
    const savedcurrentSlide = sessionStorage.getItem("currentSlide");
    if (savedcurrentSlide !== null) {
      const currentSlideIndex = parseInt(savedcurrentSlide);
      setcurrentSlide(currentSlideIndex);
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(currentSlideIndex);
      }
    }
  }, []);

  const getcurrentSlide = (currentIndex) => {
    setcurrentSlide(currentIndex);
    sessionStorage.setItem("currentSlide", currentIndex);
  };

  const settings = {
    onTouchEnd: false,
    onTouchMove: false,
    onTouchStart: false,
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
    swipeToSlide: true,
    draggable: true,
    afterChange: getcurrentSlide,
    prevArrow: (
      <div className="slick-prev" onClick={() => slickPrev()}>
        <img src={prevArrow} alt="Previous" />
      </div>
    ),
    nextArrow: (
      <div className="slick-next" onClick={() => slickNext()}>
        <img src={prevArrow} alt="Next" />
      </div>
    ),
  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
    swipeToSlide: true,
    draggable: true,
    prevArrow: (
      <div className="slick-prev" onClick={() => slickPrev()}>
        <img src={prevArrow} alt="Previous" />
      </div>
    ),
    nextArrow: (
      <div className="slick-next" onClick={() => slickNext()}>
        <img src={prevArrow} alt="Next" />
      </div>
    ),
  };

  useEffect(() => {
    if (newsItems.length == 0 || premieresItem.length == 0) {
      fetchMediaPosts();
      fetchPremieres();
    } else if (newsItems.length > 0 || premieresItem.length > 0) {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading && <div className="loading-text">Loading...</div>}
      {fetchMediaPosts && (
        <section className="news">
          <div className="container">
            <div className="news__row">
              <Slider ref={sliderRef} {...settings}>
                {newsItems.map((item) => (
                  <li className="news__item" key={item.kinopoiskId}>
                    <img
                      className="news__img"
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className="news__text-block">
                      <h3 className="news__title">{item.title}</h3>
                      <p className="news__text">{item.description}</p>
                    </div>
                  </li>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      )}
      {fetchPremieres && (
        <section className="premieres">
          <div className="container">
            <h1 className="title">Кинопремьеры </h1>
            <ul className="list-premieres">
              <Slider {...settings2}>
                {premieresItem.map((item) => (
                  <li className="films-list__item" key={item.kinopoiskId}>
                    <img
                      className="films-list__poster-passive films-list__poster-mb"
                      src={item.posterUrlPreview}
                      alt={item.nameRu}
                      loading="lazy"
                    />
                    <p className="films-list__name">{item.nameRu}</p>
                    {item.genres.map((genre, index) => (
                      <span key={index} className="films-list__genre">
                        {genre.genre}
                        {index < item.genres.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    <ButtonPremieres item={item} />
                  </li>
                ))}
              </Slider>
            </ul>
          </div>
        </section>
      )}
      {error && <div>Error: {error.message}</div>}
    </>
  );
}

export default News;
