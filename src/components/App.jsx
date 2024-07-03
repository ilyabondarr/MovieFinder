import React from "react";
import { Route, Routes } from "react-router-dom";
import News from "./News.jsx"
import Films from "./Films.jsx";
import Keywords from "./Keywords.jsx";
import Favorites from "./Favorites.jsx";
import Header from "./Header.jsx";


export default function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/films" element={<Films />} />
          <Route path="/keywords" element={<Keywords />}/>
        </Routes>
      
    </>
  );
}
