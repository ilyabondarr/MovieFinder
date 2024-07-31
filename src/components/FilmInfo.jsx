import React, { useContext, useEffect } from "react";
import FetchRequests from "./FetchRequests.jsx";
import { FilmContext } from "./App.jsx";
function FilmInfo() {
  const selectedFilm = JSON.parse(localStorage.getItem("currentFilm"));
  const { sites } = useContext(FilmContext);
  const { isLoading } = FetchRequests();
  const sitesList = JSON.parse(sessionStorage.getItem("sites"));

  return (
    <>
      {selectedFilm && (
        <section className="film-info container">
          <div className="film-info__content ">
            <div className="film-info__row">
              <img
                src={selectedFilm.posterUrlPreview}
                className="film-info__poster-passive"
              />
              <div className="info-block">
                <h1 className="info-block__title">{selectedFilm.nameRu},</h1>
                <h2 className="info-block__small-title info-block__title">
                  {selectedFilm.nameEn}
                </h2>
                <p className="info-block__text">
                  Жанр:{" "}
                  {selectedFilm &&
                    selectedFilm.genres &&
                    selectedFilm.genres.map((genre) => genre.genre).join(", ")}
                </p>
                <p className="info-block__text">{selectedFilm.description}</p>
                <p className="info-block__text">
                  Рейтинг: {selectedFilm.rating}
                </p>
                <p className="info-block__text">Год: {selectedFilm.year}</p>
                <p className="info-block__text">
                  Продолжительность: {selectedFilm.filmLength}
                </p>
                <p className="info-block__text">
                  Год выпуска: {selectedFilm.year}
                </p>
                <p className="info-block__text ">Где посмотреть:</p>
                {sitesList.length > 0 &&(
                    <ul className="sites-row">
                      {sitesList.map((item) => (
                        <li className="sites-row__item">
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
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default FilmInfo;
