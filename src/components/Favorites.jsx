import React, { useState, useEffect } from "react";
import FetchRequests from "./FetchRequests.jsx";
import { NavLink } from "react-router-dom";

function Favorites() {
  const [films, setFilms] = useState([]);
  const keyName = "films";
  const { fetchFilmInfo } = FetchRequests();
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
        {films.length == 0 && (
          <div className="loading-text">Здесь пока ничего нет</div>
        )}
        <ul className="films-list">
          {films.map((film) => (
            <li className="films-list__item" key={film.id}>
              <NavLink to={`/film/${film.id}`}>
                <img
                  className="poster-active poster-mb"
                  src={film.poster}
                  onClick={() => {
                    fetchFilmInfo(film.id);
                  }}
                />
              </NavLink>
              <div className="films-list__name">{film.name}</div>
              <button
                className="button--position main-button"
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
