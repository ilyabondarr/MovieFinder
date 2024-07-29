import { useState, useContext } from "react";
import { FilmContext } from "./App.jsx";

const FetchKeywords = () => {
  const [isLoading, setLoading] = useState(false);
  const { setFilmList } = useContext(FilmContext);

  const getFetch = (inputValue) => {
    setLoading(true);
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${`${inputValue}`}`,
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
        setFilmList(result.films);
      })
      .catch((error) => console.log("Ошибка", error))
      .finally(() => {
        setLoading(false);
      });
  };

  return {  isLoading, getFetch };
};

export default FetchKeywords;
