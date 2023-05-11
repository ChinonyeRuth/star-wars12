import React, { useEffect, useState } from 'react'

const MovieDetails = ({ movieId }) => {
  const [movieDetails, setMovieDetails] = useState(null)
  const [planets, setPlanets] = useState([])
  const [starships, setStarships] = useState([])
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://swapi.dev/api/films/${movieId}`,
        )
        const movieData = await movieResponse.json()
        setMovieDetails(movieData)

        const planetsResponse = await Promise.all(
          movieData.planets.map((planetUrl) =>
            fetch(planetUrl).then((response) => response.json()),
          ),
        )
        setPlanets(planetsResponse)

        const starshipsResponse = await Promise.all(
          movieData.starships.map((starshipUrl) =>
            fetch(starshipUrl).then((response) => response.json()),
          ),
        )
        setStarships(starshipsResponse)

        const charactersResponse = await Promise.all(
          movieData.characters.map((characterUrl) =>
            fetch(characterUrl).then((response) => response.json()),
          ),
        )
        setCharacters(charactersResponse)
      } catch (error) {
        console.error('Error fetching movie details:', error)
        setMovieDetails(null)
        setPlanets([])
        setStarships([])
        setCharacters([])
      }
    }

    fetchMovieDetails()
  }, [movieId])

  if (!movieDetails) {
    return <p>Failed to fetch movie details.</p>
  }

  return (
    <div className="movie-details">
      <h1>{movieDetails.title}</h1>
      <p>Release Date: {movieDetails.release_date}</p>
      <p>Director: {movieDetails.director}</p>
      <p>{movieDetails.opening_crawl}</p>

      <h2>Planets</h2>
      {planets.length > 0 ? (
        <ul>
          {planets.map((planet) => (
            <li key={planet.url}>{planet.name}</li>
          ))}
        </ul>
      ) : (
        <p>No planets found for this movie.</p>
      )}

      <h2>Starships</h2>
      {starships.length > 0 ? (
        <ul>
          {starships.map((starship) => (
            <li key={starship.url}>{starship.name}</li>
          ))}
        </ul>
      ) : (
        <p>No starships found for this movie.</p>
      )}

      <h2>Characters</h2>
      {characters.length > 0 ? (
        <ul>
          {characters.map((character) => (
            <li key={character.url}>{character.name}</li>
          ))}
        </ul>
      ) : (
        <p>No characters found for this movie.</p>
      )}
    </div>
  )
}

export default MovieDetails
