import React, { useState, useEffect } from "react";

function Favorites() {
  const [films, setFilms] = useState([]);
  const keyName = "films";

  useEffect(() => {
    const filmsFromStorage = JSON.parse(localStorage.getItem(keyName));
    setFilms(filmsFromStorage || []);
  }, []);

  const removeFavotitesFilm = (film) => {
    const films = JSON.parse(localStorage.getItem(keyName));
    const innerFilms = films.findIndex((i) => i.id === film.id);
    films.splice(innerFilms, 1);
    setFilms(films);
    localStorage.setItem(keyName, JSON.stringify(films));
  };
  return (
    <section className="favorites">
      <div className="container">
        <ul className="favorites__list">
          {films.map((film) => (
            <li className="favorites__item" key={film.id}>
              <img
                className="search-page__poster search-page__poster-mb"
                src={film.poster}
              />
              <div className="search-page__small-title-text">{film.name}</div>
              <button
                className="main-button button--position"
                onClick={() => removeFavotitesFilm(film)}
              >
                Убрать из избранного
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Favorites;
