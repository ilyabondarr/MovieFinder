import { useState, useContext } from "react";
import { FilmContext } from "./App.jsx";

const MainFetchs = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonthItem, setCurrentMonth] = useState("");
  const { saveNews, getPremieres } = useContext(FilmContext);
  const getFilmList = (films) => {
    sessionStorage.setItem("filmsKeywords", JSON.stringify(films));
  };
  const getSitesList = (site) => {
    sessionStorage.setItem("sites", JSON.stringify(site));
  };

  const fetchPremieres = () => {
    const currentDate = new Date();
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "May",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];

    const currentMonth = months[currentDate.getMonth()];
    setCurrentMonth(currentMonth);

    setIsLoading(false);
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=${currentMonth}&page=1`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "2179471a-f640-47bf-8188-eae5ad058394",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((item) => {
        getPremieres(item.items);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("release", error);
        setIsLoading(false);
      });
  };

  const fetchMediaPosts = () => {
    setIsLoading(false);
    fetch("https://kinopoiskapiunofficial.tech/api/v1/media_posts", {
      method: "GET",
      headers: {
        "X-API-KEY": "2179471a-f640-47bf-8188-eae5ad058394",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((items) => {
        saveNews(items.items);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Ошибка", error);
        setIsLoading(false);
      });
  };

  const fetchFilmKeywords = (inputValue) => {
    setIsLoading(true);
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
        getFilmList(result.films);
      })
      .catch((error) => console.log("Ошибка", error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const fetchSites = (id) => {
    setIsLoading(true);
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/external_sources`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "2179471a-f640-47bf-8188-eae5ad058394",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((item) => {
        getSitesList(item.items);
        setIsLoading(false);
      })
      .catch((error) => console.log("Ошибка", error));
  };
  return {
    error,
    isLoading,
    fetchMediaPosts,
    fetchPremieres,
    setIsLoading,
    fetchFilmKeywords,
    fetchSites,
  };
};

export default MainFetchs;
