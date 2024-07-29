import { useEffect, useState, useContext } from "react";
import { FilmContext } from "./App.jsx";

const MainFetchs = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonthItem, setCurrentMonth] = useState("");
  const { saveNews, getPremieres } = useContext(FilmContext);

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

  const useFetch = () => {
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

  return { error, isLoading, useFetch, fetchPremieres, setIsLoading };
};

export default MainFetchs;
