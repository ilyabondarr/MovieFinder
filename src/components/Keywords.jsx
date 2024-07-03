import React, { useState } from "react";
import icon from "../assets/search-icon.png";
import ButtonLS from "./ButtonLS.jsx";

function Keywords() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFetch();
    }
  };

  const handleFetch = () => {
    setLoading(true);

    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(
        `${inputValue}`
      )}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "2179471a-f640-47bf-8188-eae5ad058394",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result.films);
        console.log(data);
      })
      .catch((error) => console.log("Ошибка", error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <section className="search-page">
        <div className="container">
          <div className="search-page__input-box ">
            <input
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="search-page__input"
              placeholder="Введите название фильма"
            />

            <img
              src={icon}
              onClick={handleFetch}
              className="search-page__img"
              alt="search-icon"
            />
          </div>
          {isLoading && <div className="loading-text">Loading...</div>}
          {data.length > 0 && (
            <ul className="search-page__list">
              {data.map((item) => (
                <li className="search-page__item" key={item.filmId}>
                  <img
                    className="search-page__poster search-page__poster-mb"
                    src={item.posterUrlPreview}
                    alt={item.nameRu}
                  />
                  <div className="search-page__small-title-text">
                    {item.nameRu}
                  </div>
                  <div className="search-page__small-text">{item.year}</div>
                  <div className="search-page__length-text">
                    Длительность: {item.filmLength}
                  </div>
                  <div className="search-page__descr-text ">
                    {item.description}
                  </div>
                  <ButtonLS item={item}/>
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
