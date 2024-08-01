import React, { useState, useEffect } from "react";
import MovieCard from './components/MovieCard';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import UserProfile from './components/UserProfile';
import "./App.css";

const API_URL = 'https://www.omdbapi.com?apikey=dd5ae328';

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    const savedUsername = localStorage.getItem("username");
    if (savedLoginState === "true" && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
      searchMovies("Film");
    }
  }, []);

  const searchMovies = async (title) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
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

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("username");
    setMovies([]);
    setSearchTerm("");
    setUsername("");
  };

  const showRegister = () => {
    setIsRegistering(true);
  };

  const showLogin = () => {
    setIsRegistering(false);
  };

  const handleRegister = (username) => {
    setIsRegistering(false);
    setUsername(username);
  };

  return (
    <div className='app'>
      <header>
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="logo" />
        </div>
        <nav>
          <a href="app.js">Top Films</a>
          <a href="app.js">All Genres</a>
          <a href="app.js">Popular</a>
          <a href="#films-2024">Films 2024</a>
        </nav>
        <div className="auth">
          {isLoggedIn ? (
            <UserProfile username={username} onLogout={handleLogout} />
          ) : null}
        </div>
      </header>

      {isLoggedIn ? (
        <>
          <div className='search'>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  searchMovies(searchTerm);
                }
              }}
              placeholder="Search for your favorite film..."
            />
            <button onClick={() => searchMovies(searchTerm)}>
              <img src={`${process.env.PUBLIC_URL}/img/search.svg`} alt='search' />
            </button>
          </div>

          {isLoading ? (
            <div className='loading'>
              <img src={`${process.env.PUBLIC_URL}/img/loading.svg`} alt="Loading" />
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
              <h2>No films found</h2>
            </div>
          )}
        </>
      ) : (
        isRegistering ? (
          <RegistrationForm onRegister={handleRegister} />
        ) : (
          <LoginForm onLogin={handleLogin} showRegister={showRegister} />
        )
      )}
    </div>
  );
};

export default App;
