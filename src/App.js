import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieProvider from "./context/MovieContext";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";

const App = () => {
  return (
    <MovieProvider>
      <Router>
        <div className="bg-gray-900 text-white min-h-screen">
          <header className="bg-black text-white p-4">
            <h1 className="text-3xl font-bold">CineBook</h1>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
};

export default App;
