import React from "react";

const MovieComponent = ({ movie, onMovieSelect }) => {
  const handleClick = () => {
    if (onMovieSelect) {
      onMovieSelect(movie.imdbID);
    }
  };

  return (
    <div
      className="bg-gray-800 text-white rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition duration-200"
      onClick={handleClick}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">{movie.Title}</h3>
      <p className="mt-2 text-gray-400">{movie.Year}</p>
    </div>
  );
};

export default MovieComponent;
