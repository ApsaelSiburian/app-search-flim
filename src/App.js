import React, { useState, useEffect } from "react";
import MovieCard from './components/MovieCard';
import "./App.css";

const API_URL = 'http://www.omdbapi.com?apikey=dd5ae328';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {    /* lifecycle methods */
    searchMovies("Film");
  }, []);

  const searchMovies = async (title) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}&s=${title}`); /* pengambilan data API */
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='app'>
      <header>
        <div className="logo">
          <img src="img/logo.png" alt="logo" />
        </div>
        <nav>
          <a href="app.js">Top Flim</a>
          <a href="app.js">All Genre</a>
          <a href="app.js">Populer</a>
          <a href="app.js">Flim 2024</a>
        </nav>
      </header>

      <div className='search'> 
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} /* form dan validasi */
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              searchMovies(searchTerm);
            }
          }}
          placeholder="cari flim kesukaanmu..."
        />
        <button onClick={() => searchMovies(searchTerm)}>
          <img src="img/search.svg" alt='search' />
        </button>
      </div>

      {isLoading ? (              /* loading */
        <div className='loading'> 
          <img src="img/loading.svg" alt="Loading" /> 
        </div>
      ) : error ? (
        <div className='error'>
          <h2>{error}</h2>
        </div>
      ) : movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>Tidak ada flim</h2>
        </div>
      )}
    </div>
  );
};

export default App;
