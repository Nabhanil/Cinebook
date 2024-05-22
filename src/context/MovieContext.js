import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  const fetchMovies = async () => {
    const randomQueries = ["batman", "spiderman", "avengers", "star wars", "harry potter"];
    const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];
    const response = await axios.get(`https://www.omdbapi.com/?s=${randomQuery}&apikey=addc89a5`);
    setMovies(response.data.Search);
  };

  const searchMovies = async (query) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=addc89a5`);
    setSearchResults(response.data.Search);
  };

  const fetchMovieDetails = async (id) => {
    const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=addc89a5`);
    setMovieDetails(response.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, searchResults, movieDetails, searchMovies, fetchMovieDetails }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
