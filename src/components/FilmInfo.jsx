import React, { useEffect } from "react";
import FetchRequests from "./FetchRequests.jsx";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
function FilmInfo() {
  const selectedFilm = JSON.parse(localStorage.getItem("currentFilm"));
  const {
    fetchSites,
    staffItems,
    sites,
    isLoading,
    fetchSimilars,
    similarsFillms,
    fetchStaff,
    fetchFilmInfo,
  } = FetchRequests();
  const id = selectedFilm.filmId || selectedFilm.kinopoiskId;

  useEffect(() => {
    fetchSites(id);
    fetchSimilars(id);
    fetchStaff(id);
  }, [id]);

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
  const settings3 = {
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 5,
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

  return (
    <>
      {isLoading && <div className="loading-text">Loading...</div>}
      {selectedFilm && (
        <section className="film-info container">
          <div className="film-info__content">
            <div className="film-info__row">
              <div className="info-block">
                <h1 className="info-block__title">{selectedFilm.nameRu}</h1>
                {selectedFilm.nameEn && (
                  <h2 className="info-block__small-title info-block__title">
                    ,{selectedFilm.nameEn}
                  </h2>
                )}
                <p className="info-block__text">
                  Жанр:{" "}
                  {selectedFilm &&
                    selectedFilm.genres &&
                    selectedFilm.genres.map((genre) => genre.genre).join(", ")}
                </p>
                <p className="info-block__text">{selectedFilm.description}</p>
                <p className="info-block__text">
                  Рейтинг:{" "}
                  <span className="info-block__text-bold">
                    {selectedFilm.ratingImdb || selectedFilm.ratingKinopoisk}
                  </span>
                </p>
                <p className="info-block__text">
                  Год:{" "}
                  <span className="info-block__text-bold">
                    {selectedFilm.year}
                  </span>
                </p>
                <p className="info-block__text">
                  Продолжительность:{" "}
                  <span className="info-block__text-bold">
                    {selectedFilm.filmLength}
                  </span>
                </p>
                <p className="info-block__text">
                  Год выпуска:{" "}
                  <span className="info-block__text-bold">
                    {selectedFilm.year}
                  </span>
                </p>
                {sites.length > 0 && (
                  <p className="info-block__text ">Где посмотреть</p>
                )}
                {sites.length > 0 && (
                  <ul className="sites-row">
                    {sites.map((item) => (
                      <li
                        key={`${item.platform}-${item.url}`}
                        className="sites-row__item"
                      >
                        <img
                          src={`${item.logoUrl}`}
                          className="sites-row__img"
                        />
                        <a className="sites-row__link" href={`${item.url}`}>
                          {item.platform}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <img
                src={selectedFilm.posterUrlPreview}
                className="film-info__poster-passive"
              />
            </div>
          </div>
          <section className="staff">
            <h2 className="title">Актеры снимавшиеся в этом фильме</h2>
            <ul className="staff__row">
              <Slider {...settings3}>
                {staffItems
                  .slice(0, 20)
                  .filter((item) => item.nameRu)
                  .map((item) => (
                    <li className="staff__item" key={item.staffId}>
                      <img
                        src={item.posterUrl}
                        loading="lazy"
                        className="staff__img"
                      />
                      <p className="staff__text">{item.nameRu}</p>
                    </li>
                  ))}
              </Slider>
            </ul>
          </section>
          <section className="similars-fillms">
            {similarsFillms.length > 0 && (
              <h2 className="title">Похожие фильмы</h2>
            )}
            {similarsFillms.length > 4 ? (
              <ul className="list-premieres">
                <Slider {...settings2}>
                  {similarsFillms.map((item) => (
                    <li className="films-list__item" key={item.filmId}>
                      <NavLink
                        to={`/film/${item.filmId}`}
                        onClick={() => fetchFilmInfo(item.filmId)}
                      >
                        <img
                          className="poster-active poster-mb"
                          src={item.posterUrlPreview}
                          alt={item.nameRu}
                          loading="lazy"
                        />
                      </NavLink>
                      <div className="films-list__name">{item.nameRu}</div>
                    </li>
                  ))}
                </Slider>
              </ul>
            ) : (
              <ul className="films-list film-list--position">
                {similarsFillms.map((item) => (
                  <li className="films-list__item" key={item.filmId}>
                    <NavLink
                      to={`/film/${item.filmId}`}
                      onClick={() => fetchFilmInfo(item.filmId)}
                    >
                      <img
                        className="poster-active poster-mb"
                        src={item.posterUrlPreview}
                        alt={item.nameRu}
                        loading="lazy"
                      />
                    </NavLink>
                    <div className="films-list__name">{item.nameRu}</div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </section>
      )}
    </>
  );
}

export default FilmInfo;
