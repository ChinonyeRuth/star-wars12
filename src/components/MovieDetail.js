import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MovieDetail = () => {
  const { id } = useParams()
  const [movieDetails, setMovieDetails] = useState(null)
  const [planets, setPlanets] = useState([])
  const [starships, setStarships] = useState([])
  const [characters, setCharacters] = useState([])
  const [species, setSpecies] = useState([])
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(`https://swapi.dev/api/films/${id}`)
        const movieData = await movieResponse.json()
        setMovieDetails(movieData)

        const fetchPlanets = async () => {
          const planetResponses = await Promise.all(
            movieData.planets.map((planetUrl) =>
              fetch(planetUrl).then((response) => response.json()),
            ),
          )
          setPlanets(planetResponses)
        }

        const fetchStarships = async () => {
          const starshipResponses = await Promise.all(
            movieData.starships.map((starshipUrl) =>
              fetch(starshipUrl).then((response) => response.json()),
            ),
          )
          setStarships(starshipResponses)
        }

        const fetchCharacters = async () => {
          const characterResponses = await Promise.all(
            movieData.characters.map((characterUrl) =>
              fetch(characterUrl).then((response) => response.json()),
            ),
          )
          setCharacters(characterResponses)
        }

        const fetchSpecies = async () => {
          const speciesResponses = await Promise.all(
            movieData.species.map((speciesUrl) =>
              fetch(speciesUrl).then((response) => response.json()),
            ),
          )
          setSpecies(speciesResponses)
        }

        const fetchVehicles = async () => {
          const vehicleResponses = await Promise.all(
            movieData.vehicles.map((vehicleUrl) =>
              fetch(vehicleUrl).then((response) => response.json()),
            ),
          )
          setVehicles(vehicleResponses)
        }

        fetchPlanets()
        fetchStarships()
        fetchCharacters()
        fetchSpecies()
        fetchVehicles()
      } catch (error) {
        console.error('Error fetching movie details:', error)
        setMovieDetails(null)
        setPlanets([])
        setStarships([])
        setCharacters([])
        setSpecies([])
        setVehicles([])
      }
    }

    fetchMovieDetails()
  }, [id])

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
      <hr />
      <h2>Species</h2>
      {species.length > 0 ? (
        <ul>
          {species.map((specie) => (
            <li key={specie.url}>{specie.name}</li>
          ))}
        </ul>
      ) : (
        <p>No species found for this movie.</p>
      )}

      <hr />
      <h2>Vehicles</h2>
      {vehicles.length > 0 ? (
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle.url}>{vehicle.name}</li>
          ))}
        </ul>
      ) : (
        <p>No vehicles found for this movie.</p>
      )}
    </div>
  )
}

export default MovieDetail
