import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import icon from "../assets/search-icon.png";
import ButtonLS from "./ButtonLS.jsx";
import FetchKeywords from "./FetchKeywords.jsx";
import { FilmContext } from "./App.jsx";

function Keywords() {
  const [inputValue, setInputValue] = useState("");
  const {  isLoading, getFetch } = FetchKeywords();
  const { films, selectFilm } = useContext(FilmContext);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleFilmClick = (film) => {
    selectFilm(film);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getFetch(inputValue);
    }
  };

  return (
    <>
      <section className="search-page">
        <div className="container">
          <div className="search-box">
            <input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="search-box__input"
              placeholder="Введите название фильма"
            />

            <img
              src={icon}
              onClick={() => getFetch(inputValue)}
              className="search-box__img"
              alt="search-icon"
            />
          </div>
          {isLoading && <div className="loading-text">Loading...</div>}

          {films.length > 0 && (
            <ul className="films-list">
              {films.map((item) => (
                <li className="films-list__item" key={item.filmId}>
                  <NavLink to={`/film/${item.filmId}`}>
                    <img
                    onClick={() => handleFilmClick(item)}
                      className="films-list__poster-active films-list__poster-mb"
                      src={item.posterUrlPreview}
                      alt={item.nameRu}
                    />
                  </NavLink>
                  <div className="films-list__name">{item.nameRu}</div>
                  {item.genres.map((genre, index) => (
                      <span key={index} className="films-list__genre">
                        {genre.genre} 
                        {index < item.genres.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  <ButtonLS item={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

export default Keywords;
