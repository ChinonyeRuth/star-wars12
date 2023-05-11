import './App.css'
import './index.css'
import { useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import MovieCard from './MovieCard'
import Header from './Header'
import MovieDetail from './components/MovieDetail'

function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch('https://swapi.dev/api/films')
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
  }, [])

  return (
    <div>
      <Header />
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard key={movie.episode_id} movie={movie} />
        ))}
      </div>
      <Routes>
        {/* Route for individual movie details */}
        <Route path="/movie/:id" element={<MovieDetail />} />

        {/* Route for the "Back to List" link */}
        <Route path="/" element={<Link to="/">Back to List</Link>} />
      </Routes>
    </div>
  )
}

export default App

//generate a function for adding two numbers
