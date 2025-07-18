import React, { useEffect, useState } from "react";
import Axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import Search from "../../components/Search/Search";
import AddToWatchlist from "../../components/Buttons/AddToWatchlist";
import heroImg from "../../Assets/mintmoovie-hero.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();
  const resultsPerPage = 10;

  const movieRequest = async (searchString, page = 1) => {
    if (!API_KEY) {
      console.error("❌ API KEY missing in .env file");
      return;
    }

    const url = `https://www.omdbapi.com/?s=${searchString}&page=${page}&apikey=${API_KEY}`;
    try {
      const response = await Axios.get(url);
      if (response.data.Search) {
        setMovies(response.data.Search);
        setTotalResults(parseInt(response.data.totalResults));
        setPageCount(Math.ceil(response.data.totalResults / resultsPerPage));
      } else {
        setMovies([]);
        setPageCount(1);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  const handlePageClick = (event, value) => {
    window.scrollTo(0, 0);
    movieRequest(search, value);
  };

  useEffect(() => {
    if (search) {
      movieRequest(search);
    } else {
      setMovies([]);
      setPageCount(1);
    }
  }, [search]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("Watchlist"));
    if (stored) {
      setWatchlist(stored);
    }
  }, []);

  const saveToLocal = (items) => {
    if (items.length <= 5) {
      localStorage.setItem("Watchlist", JSON.stringify(items));
    } else {
      alert("You have reached the maximum number of watchlist items (5)");
      navigate("/watchlist");
    }
  };

  const addToWatchlist = (movie) => {
    if (watchlist.find((m) => m.imdbID === movie.imdbID)) {
      alert("Movie already added to watchlist!");
      return;
    }
    const updatedList = [...watchlist, movie];
    setWatchlist(updatedList);
    saveToLocal(updatedList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="search-area">
        <Search value={search} setValue={setSearch} />
      </div>

      <div className="row">
        {search && movies.length > 0 ? (
          <>
            <MovieList
              movies={movies}
              handleWatchlistClick={addToWatchlist}
              actionComponent={AddToWatchlist}
            />
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  className="pagination-comp"
                  count={pageCount}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageClick}
                  size="large"
                  tabIndex={-1}
                  showFirstButton
                  showLastButton
                  sx={{
                    "& .MuiPaginationItem-root": {
                      boxShadow: 1,
                      "&:hover": {
                        boxShadow: 2,
                      },
                      "&.Mui-selected": {
                        boxShadow: 10,
                      },
                    },
                  }}
                />
              </Stack>
            </div>
          </>
        ) : (
          <div className="no-movies">
            <img
              src={heroImg}
              alt="Welcome to MintMoovie!"
              className="heroImg"
            />
            <h2 className="welcome-heading">Welcome to MintMoovie 🎬</h2>
            <p className="sub-text">
              Start by typing a movie name in the search bar above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
