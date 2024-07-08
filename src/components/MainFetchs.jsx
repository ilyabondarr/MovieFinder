import { useEffect, useState } from "react";

const MainFetchs = () => {
  const [news, setNews] = useState([]);
  const [release, setRelease] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(null);

  useEffect(() => {
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
  
    fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=${currentMonth}&page=1`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": "2179471a-f640-47bf-8188-eae5ad058394",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((items) => {
        setRelease(items.releases);
        setIsLoading(false);
        console.log(items);
      })
      .catch((error) => {
        console.log("release", error);
        setIsLoading(false);
      });
  }, []);
  

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
        setError("Ошибка", error);
        setIsLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   fetch(
  //     `https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2024&month=${currentMonth=}&page=1`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "X-API-KEY": "2179471a-f640-47bf-8188-eae5ad058394",
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((items) => {
  //       setRelease(items.releases);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log("release", error);
  //       setIsLoading(false);
  //     });
  // }, []);

  return { news, error, isLoading, release };
};

export default MainFetchs;
