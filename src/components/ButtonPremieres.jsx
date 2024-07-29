import React, { useState } from "react";

const ButtonPremieres = ({ item }) => {
  const [buttonText, setButtonText] = useState({});
  const keyName = "films";

  const putFilms = (item) => {
    const films = JSON.parse(localStorage.getItem(keyName)) || [];
    const innerFilms = films.findIndex((i) => i.id === item.kinopoiskId);
    const isAdded = films.some((i) => i.id === item.kinopoiskId);

    if (innerFilms === -1 && !isAdded) {
      const newFilm = {
        id: item.kinopoiskId,
        name: item.nameRu,
        poster: item.posterUrlPreview,
      };
      films.push(newFilm);
      setButtonText((prevText) => ({
        ...prevText,
        [item.kinopoiskId]: "Удалить из избранного",
      }));
    } else { 
      films.splice(innerFilms, 1);
      setButtonText((prevText) => ({
        ...prevText,
        [item.kinopoiskId]: "Добавить в избранное",
      }));
    }

    localStorage.setItem(keyName, JSON.stringify(films));
  };
  return (
    <button
      onClick={() => putFilms(item)}
      className={`main-button  ${
        JSON.parse(localStorage.getItem(keyName))?.some(
          (i) => i.id === item.kinopoiskId
        )
          ? "button-active"
          : ""
      }`}
    >
      {buttonText[item.kinopoiskId] !== undefined
        ? buttonText[item.kinopoiskId]
        : JSON.parse(localStorage.getItem(keyName))?.some(
            (i) => i.id === item.kinopoiskId
          )
        ? "Удалить из избранного"
        : "Добавить в избранное"}
    </button>
  );
}

export default ButtonPremieres;
