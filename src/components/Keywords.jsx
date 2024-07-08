import React, { useState } from "react";
import icon from "../assets/search-icon.png";
import ButtonLS from "./ButtonLS.jsx";
import FetchKeywords from "./FetchKeywords.jsx";

function Keywords() {
  const [inputValue, setInputValue] = useState("");
  const { data, isLoading, getFetch } = FetchKeywords();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getFetch(inputValue)
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
          {data.length > 0 && (
            <ul className="films-list">
              {data.map((item) => (
                <li className="films-list__item" key={item.filmId}>
                  <img
                    className="films-list__poster films-list__poster-mb"
                    src={item.posterUrlPreview}
                    alt={item.nameRu}
                  />
                  <div className="films-list__name">
                    {item.nameRu}
                  </div>
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
