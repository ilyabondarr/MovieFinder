import React, { useState } from "react";
import icon from "../assets/search-icon.png";

function Films() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFetch();
    }
  };

  const handleFetch = () => {
    setIsLoading(true);
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${inputValue}`, {
      method: "GET",
      headers: {
        "X-API-KEY": "2179471a-f640-47bf-8188-eae5ad058394",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((items) => setData(items))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <section className="search-page">
        <div className="container">
          <div className="search-block">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="search-input"
              placeholder="Введите ID фильма"
            />

            <img
              src={icon}
              onClick={handleFetch}
              className="search-img"
              alt="search-icon"
            />
          </div>
          <div>
            {isLoading && <div className="loading-text">Loading...</div>}
            {data.nameRu  && (
              <div className="search-page__film-info">
                <div className="search-page__left-block">
                  <p className="search-page__text">{data.nameRu}</p>
                  <p className="search-page__text">✨{data.ratingKinopoisk}</p>
                  <p className="search-page__small-text">
                    {data.shortDescription}
                  </p>
                </div>
                <img className="search-page__poster" src={data.posterUrl} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Films;
