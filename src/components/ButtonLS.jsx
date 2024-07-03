import React, { useState } from "react";

const ButtonLS = ({ item }) => {
  const [buttonText, setButtonText] = useState({});
  const keyName = "films";

  const putFilms = (item) => {
    const films = JSON.parse(localStorage.getItem(keyName)) || [];
    const innerFilms = films.findIndex((i) => i.id === item.filmId);
    const isAdded = films.some((i) => i.id === item.filmId);

    if (innerFilms === -1 && !isAdded) {
      const newFilm = {
        id: item.filmId,
        name: item.nameRu,
        poster: item.posterUrlPreview,
      };
      films.push(newFilm);
      setButtonText((prevText) => ({
        ...prevText,
        [item.filmId]: "Удалить из избранного",
      }));
    } else {
      films.splice(innerFilms, 1);
      setButtonText((prevText) => ({
        ...prevText,
        [item.filmId]: "Добавить в избранное",
      }));
    }

    localStorage.setItem(keyName, JSON.stringify(films));
  };
  return (
    <button
      onClick={() => putFilms(item)}
      className={`main-button  ${
        JSON.parse(localStorage.getItem(keyName))?.some(
          (i) => i.id === item.filmId
        )
          ? "button-active"
          : ""
      }`}
    >
      {buttonText[item.filmId] !== undefined
        ? buttonText[item.filmId]
        : JSON.parse(localStorage.getItem(keyName))?.some(
            (i) => i.id === item.filmId
          )
        ? "Удалить из избранного"
        : "Добавить в избранное"}
    </button>
  );
}

export default ButtonLS;
