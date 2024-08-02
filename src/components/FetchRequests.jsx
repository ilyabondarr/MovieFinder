import { useState, useContext } from "react";
import { FilmContext } from "./App.jsx";

const MainFetchs = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonthItem, setCurrentMonth] = useState("");
  const [sites, setSites] = useState([]);
  const [similarsFillms, setSimilarsFilms] = useState([]);
  const [staffItems, setStaffItems] = useState([]);

  const { saveNews, getPremieres } = useContext(FilmContext);
  const getFilmList = (films) => {
    sessionStorage.setItem("filmsKeywords", JSON.stringify(films));
  };
  const getCurrentFilmFromPremieres = (film) => {
    localStorage.removeItem("currentFilm");
    localStorage.setItem("currentFilm", JSON.stringify(film));
    console.log(film)
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
          "X-API-KEY": " 91062827-bad9-405f-9c57-bd5456e1c1ef",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((item) => {
        getPremieres(item.items);
        console.log(1)
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
        "X-API-KEY": " 91062827-bad9-405f-9c57-bd5456e1c1ef",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((items) => {
        saveNews(items.items);
        setIsLoading(false);
        console.log(1)

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
          "X-API-KEY": " 91062827-bad9-405f-9c57-bd5456e1c1ef",
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
          "X-API-KEY": " 91062827-bad9-405f-9c57-bd5456e1c1ef",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((item) => {
        setSites(item.items);
        console.log(1)

        setIsLoading(false);
      })
      .catch((error) => console.log("Ошибка", error));
  };
  const fetchSimilars = (id) => { 
    setIsLoading(true);
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`, {
      method: "GET",
      headers: {
        "X-API-KEY": " 91062827-bad9-405f-9c57-bd5456e1c1ef",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((item) =>{
      setSimilarsFilms(item.items);
      console.log(1)

      setIsLoading(false);
    })
    .catch((error) => console.log("Ошибка", error));

  };
  const fetchStaff = (id) => {
    setIsLoading(true);
    fetch(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`, {
      method: "GET",
      headers: {
        "X-API-KEY": " 91062827-bad9-405f-9c57-bd5456e1c1ef",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((item) => {
      setStaffItems(item);
      console.log(1)

      setIsLoading(false);
    })
    .catch((error) => console.log("Ошибка", error));
  }
  const fetchFilmInfo = (id) => {
    setIsLoading(true);
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
      method: "GET",
      headers: {
        "X-API-KEY": " 91062827-bad9-405f-9c57-bd5456e1c1ef",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((item) => {
      getCurrentFilmFromPremieres(item);
      console.log(1)

      setIsLoading(false);
    })
  }
  return {
    error,
    isLoading,
    sites,
    similarsFillms,
    staffItems,
    fetchMediaPosts,
    fetchPremieres,
    setIsLoading,
    fetchFilmKeywords,
    fetchSites,
    fetchSimilars,
    fetchStaff,
    fetchFilmInfo,
  };
};

export default MainFetchs;
