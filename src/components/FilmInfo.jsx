import React, { useContext } from "react";
import { FilmContext } from "./App.jsx";
function FilmInfo() {
  const { selectedFilm } = useContext(FilmContext);

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
                <h1 className="info-block__title">
                  {selectedFilm.nameRu}, {selectedFilm.nameEn}
                </h1>
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
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default FilmInfo;
