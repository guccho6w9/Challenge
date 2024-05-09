import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const FilmsPage = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/films/');
        setFilms(response.data.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div>
      <h1>Películas de Star Wars</h1>
      {films.map(film => (
        <div key={film.episode_id}>
        <img src="/images/films-images/generic-image.png" alt="Imagen genérica" />
          <h2>{film.title}</h2>
          <p>Episodio: {film.episode_id}</p>
        </div>
        
      ))}
      {/* Botón de volver */}
      <Link href="/" legacyBehavior>
        <a>Volver a la página principal</a>
      </Link>
      {error && <p>Error al cargar las películas: {error.message}</p>}
    </div>
  );
};

export default FilmsPage;
