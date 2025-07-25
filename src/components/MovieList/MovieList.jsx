import React from "react";
import "./MovieList.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

function MovieList(props) {
  const notify = () => toast.success("Added to Watchlist!");
  const ActionComponent = props.actionComponent;

  return (
    <>
      <motion.div layout className="movie-list">
        <AnimatePresence>
          {props.movies.map((movie, index) => (
            <motion.div
              key={index}
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="movie"
            >
              <img
                src={movie.Poster}
                alt="Movie Poster"
                className="movie-poster"
              />
              <span className="movie-name">{movie.Title}</span>
              <div className="movie-info">
                <span className="info-span">Year: {movie.Year}</span>
                <span className="info-span">{movie.Type}</span>
              </div>
              <button
                onClick={() => {
                  props.handleWatchlistClick(movie); // ✅ updated
                  notify();
                }}
                className="watchlistBtn" // ✅ updated
              >
                <ActionComponent />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
    </>
  );
}

export default MovieList;
