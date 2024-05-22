import React, { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import Rating from "react-rating-stars-component";

const MovieInfoComponent = ({ movieId }) => {
  const { movieDetails, fetchMovieDetails } = useContext(MovieContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [movieComments, setMovieComments] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchMovieDetails(movieId);
    const savedComments = JSON.parse(localStorage.getItem(`comments_${movieId}`)) || [];
    setMovieComments(savedComments);
    calculateAverageRating(savedComments);
  }, [movieId,fetchMovieDetails]);

  const calculateAverageRating = (comments) => {
    if (comments.length === 0) return;
    const totalRating = comments.reduce((acc, comment) => acc + parseInt(comment.rating), 0);
    const average = totalRating / comments.length;
    setAverageRating(average.toFixed(1));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "" && comment.trim() !== "" && rating !== 0) {
      const newComment = { name, comment, rating };
      const updatedComments = [...movieComments, newComment];
      setMovieComments(updatedComments);
      localStorage.setItem(`comments_${movieId}`, JSON.stringify(updatedComments));
      calculateAverageRating(updatedComments);
      setComment("");
      setRating(0);
      setName("");
    }
  };

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4">{movieDetails.Title}</h1>
        <div className="flex justify-center mb-6">
          <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            className="w-64 h-auto rounded-md shadow-lg"
          />
        </div>
        <p className="text-xl mb-4"><strong>Director:</strong> {movieDetails.Director}</p>
        <p className="text-xl mb-4"><strong>Producer:</strong> {movieDetails.Producer}</p>
        <p className="text-xl mb-4"><strong>Writer:</strong> {movieDetails.Writer}</p>
        <p className="text-xl mb-4"><strong>Year:</strong> {movieDetails.Year}</p>
        <p className="text-xl mb-4"><strong>Cast:</strong> {movieDetails.Actors}</p>
        <p className="text-xl mb-4"><strong>Summary:</strong> {movieDetails.Plot}</p>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Rate This Movie</h2>
          <Rating
            value={rating}
            count={5}
            onChange={handleRatingChange}
            size={40}
            activeColor="#ffd700"
            isHalf={false}
          />
        </div>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Your Name"
            className="w-full p-2 rounded-lg bg-gray-700 text-white mb-2"
          />
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Enter your comment"
            className="w-full p-2 rounded-lg bg-gray-700 text-white mb-2"
            rows="4"
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2">Submit</button>
        </form>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Comments</h2>
          {movieComments.length > 0 ? (
            <ul className="list-disc ml-4">
              {movieComments.map((savedComment, index) => (
                <li key={index}>
                  <p className="text-lg"><strong>{savedComment.name}:</strong> {savedComment.comment}</p>
                  <p className="text-sm">Rating: {savedComment.rating}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Average Rating</h2>
          <p>{averageRating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoComponent;
