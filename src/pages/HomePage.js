import React, { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieComponent from "../components/MovieComponent";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { movies, searchResults, searchMovies } = useContext(MovieContext);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      searchMovies(e.target.value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for movies or series"
          className="w-full p-2 rounded-lg bg-gray-800 text-white"
        />
        {query && (
          <div className="bg-gray-800 text-white rounded-lg mt-2 p-4">
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((movie) => (
                <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
                  <div className="flex items-center mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-12 h-12 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{movie.Title}</h3>
                      <p className="text-gray-400">{movie.Year}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>
      <h1 className="text-4xl font-bold mb-4">Random Movies</h1>
      <div className="flex flex-wrap justify-evenly p-8 gap-6">
        {movies &&
          movies.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
              <MovieComponent movie={movie} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
