import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Watchlist.css"; // ✅ Rename corresponding CSS file too
import RemoveNomination from "../../components/Buttons/RemoveNomination";
import heroImg from "../../Assets/HeroImg2.webp";

const Watchlist = () => {
  const notify = () => toast.success("Movie Removed!");
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    let saved = localStorage.getItem("Nominations");
    saved = JSON.parse(saved) || [];
    setWatchlist(saved);
  }, []);

  function saveToLocal(items) {
    localStorage.setItem("Nominations", JSON.stringify(items));
  }

  function removeMovie(movie) {
    const newList = watchlist.filter(
      (item) => item.imdbID !== movie.imdbID
    );
    setWatchlist(newList);
    saveToLocal(newList);
    notify();
  }

  return (
    <>
      <div className="movie-list">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <div className="movie" key={movie.imdbID}>
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
                onClick={() => removeMovie(movie)}
                className="nominateBtn"
              >
                <RemoveNomination />
              </button>
            </div>
          ))
        ) : (
          <div className="no-nom">
            <img src={heroImg} alt="No Watchlist" className="heroImg" />
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar
        transition={Flip}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default Watchlist;
