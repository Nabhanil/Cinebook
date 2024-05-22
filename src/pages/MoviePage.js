import React from "react";
import { useParams } from "react-router-dom";
import MovieInfoComponent from "../components/MovieInfoComponent";

const MoviePage = () => {
  const { id } = useParams();
  return <MovieInfoComponent movieId={id} />;
};

export default MoviePage;
