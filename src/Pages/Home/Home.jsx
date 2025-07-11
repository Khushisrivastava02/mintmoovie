import React, { useEffect, useState } from "react";
import Axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import Search from "../../components/Search/Search";
import AddNomination from "../../components/Buttons/AddNomination";
import heroImg from "../../Assets/mintmoovie-hero.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const API_KEY = process.env.REACT_APP_API_KEY;

function Home() {
  const [movies, searchMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [nom, setNom] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();

  let limit = 8;

  const movieRequest = async (searchString) => {
    const url = `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`;

    try {
      const response = await Axios.get(url);
      if (response.data.Search) {
        searchMovies(response.data.Search);
      }
    } catch (error) {
      console.error("❌ API Error:", error);
    }
  };

  const handlePageClick = (event, value) => {
    window.scrollTo(0, 0);
    setPageCount(value);
    const url = `https://www.omdbapi.com/?s=${search}&page=${value}&apikey=${API_KEY}`;
    Axios.get(url).then((response) => {
      searchMovies(response.data.Search);
    });
  };

  useEffect(() => {
    if (search) movieRequest(search);
  }, [search]);

  useEffect(() => {
    const movieNom = JSON.parse(localStorage.getItem("Nominations"));
    if (movieNom) {
      setNom(movieNom);
    }
  }, []);

  function saveToLocal(items) {
    if (items.length < 6) {
      localStorage.setItem("Nominations", JSON.stringify(items));
    } else {
      alert("You have reached the maximum number of nominations");
      navigate("/nominees");
    }
  }

  function nominateMovie(movie) {
    const newNom = [...nom, movie];
    setNom(newNom);
    saveToLocal(newNom);
  }

  return (
    <div className="container-fluid movie-app">
      <div className="search-area">
        <Search value={search} setValue={setSearch} />
      </div>

      <div className="row">
        {movies.length > 0 ? (
          <>
            <MovieList
              movies={movies}
              handleNomClick={nominateMovie}
              nomComponent={AddNomination}
            />
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  className="pagination-comp"
                  count={limit}
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
            <img src={heroImg} alt="Welcome to MintMoovie!" className="heroImg" />
            <h2 className="welcome-heading">Welcome to MintMoovie 🎬</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
