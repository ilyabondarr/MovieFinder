import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import News from "./News.jsx";
import Keywords from "./Keywords.jsx";
import Favorites from "./Favorites.jsx";
import Header from "./Header.jsx";
import FilmInfo from "./FilmInfo.jsx";

export const FilmContext = createContext();

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [premieresItem, setPremieresItem] = useState([]);

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
        inputValue,
        newsItems,
        premieresItem,
        getInputValue,
        saveNews,
        getPremieres,
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/keywords" element={<Keywords />} />
        <Route path="/film/:filmId" element={<FilmInfo />} />
      </Routes>
    </FilmContext.Provider>
  );
}
