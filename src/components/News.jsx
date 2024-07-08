import React from "react";
import MainFetchs from "./MainFetchs.jsx";
import Slider from "react-slick";
import prevArrow from "../assets/prev.png";
import ButtonLS from "./ButtonLS.jsx";

function News() {
  const { news, error, isLoading, release } = MainFetchs();

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
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

  return (
    <>
      {isLoading && <div className="loading-text">Loading...</div>}
      {news.length > 0 && (
        <section className="news">
          <div className="container">
            <div className="news__row">
              <Slider {...settings}>
                {news.map((item) => (
                  <li className="news__item" key={item.kinopoiskId}>
                    <img
                      className="news__img"
                      src={item.imageUrl}
                      alt={item.title}
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
      {release.length > 0 && (
        <section className="releases">
          <div className="container">
            <h1 className="title">Релизы за последний месяц</h1>
            <ul className="films-list">
              {release
                .filter((item) => item.nameRu && item.nameRu.trim() !== "")
                .map((item) => (
                  <li className="films-list__item" key={item.filmId}>
                    <img
                      className="films-list__poster films-list__poster-mb"
                      src={item.posterUrlPreview}
                      alt={item.nameRu}
                    />
                    <p className="films-list__name">{item.nameRu}</p>

                    {item.genres.map((genre, index) => (
                      <p key={index} className="films-list__genre">
                        {genre.genre}
                      </p>
                    ))}

                    <ButtonLS item={item} />
                  </li>
                ))}
            </ul>
          </div>
        </section>
      )}
      {error && <div>Error: {error.message}</div>}
    </>
  );
}

export default News;
