import React, { useEffect, useState } from "react";

function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://kinopoiskapiunofficial.tech/api/v1/media_posts", {
      method: "GET",
      headers: {
        "X-API-KEY": "2179471a-f640-47bf-8188-eae5ad058394",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((items) => {
        setNews(items.items);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="news">
        {isLoading ? (
          <div className="loading-text">Loading...</div>
        ) : (
          <div className="container">
            <div className="news__row">
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
            </div>
          </div>
        )}
        {error && <div>Error: {error.message}</div>}
      </div>
    </>
  );
}

export default News;
