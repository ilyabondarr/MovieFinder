import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import ButtonPremieres from "./ButtonPremieres.jsx";
import FetchRequests from "./FetchRequests.jsx";
import Slider from "react-slick";
import { FilmContext } from "./App.jsx";

function News() {
  const {
    error,
    isLoading,
    setIsLoading,
    fetchMediaPosts,
    fetchPremieres,
    fetchFilmInfo,
  } = FetchRequests();
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
      <svg
        className="slick-prev"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="rotate(180 12 12)">
          <path
            d="M7 12L12 7L17 12"
            stroke="#FF9800"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 16L12 11L17 16"
            stroke="#FF9800"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    ),
    nextArrow: (
      <svg
      className="slick-next"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(180 12 12)">
        <path
          d="M7 12L12 7L17 12"
          stroke="#FF9800"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7 16L12 11L17 16"
          stroke="#FF9800"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
    ),
  };
  const settings2 = {
    centerMode: true,
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
      <svg
        className="slick-prev"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="rotate(180 12 12)">
          <path
            d="M7 12L12 7L17 12"
            stroke="#FF9800"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 16L12 11L17 16"
            stroke="#FF9800"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    ),
    nextArrow: (
      <svg
      className="slick-next"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(180 12 12)">
        <path
          d="M7 12L12 7L17 12"
          stroke="#FF9800"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7 16L12 11L17 16"
          stroke="#FF9800"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
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
                    <NavLink to={`/film/${item.kinopoiskId}`}>
                      <img
                        className="poster-active poster-mb"
                        onClick={() => {
                          fetchFilmInfo(item.kinopoiskId);
                        }}
                        src={item.posterUrlPreview}
                        alt={item.nameRu}
                        loading="lazy"
                      />
                    </NavLink>
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
