import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import News from "./News.jsx";
import Keywords from "./Keywords.jsx";
import Favorites from "./Favorites.jsx";
import Header from "./Header.jsx";
import FilmInfo from "./FilmInfo.jsx";

export const FilmContext = createContext();

export default function App() {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [premieresItem, setPremieresItem] = useState([]);

  const selectFilm = (film) => {
    setSelectedFilm(film);
  };

  const setFilmList = (newFilms) => {
    setFilms(newFilms);
  };
  const getInputValue = (val) => {
    setInputValue(val);
  };
  const saveNews = (news) => {
    setNewsItems(news);
  };
  const getPremieres = (prem) => {
    setPremieresItem(prem);
  };

  return (
    <FilmContext.Provider
      value={{
        films,
        selectedFilm,
        inputValue,
        newsItems,
        premieresItem,
        selectFilm,
        setFilmList,
        getInputValue,
        saveNews,
        getPremieres
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/keywords" element={<Keywords />} />
        <Route path="/film/:id" element={<FilmInfo />} />
      </Routes>
    </FilmContext.Provider>
  );
}
