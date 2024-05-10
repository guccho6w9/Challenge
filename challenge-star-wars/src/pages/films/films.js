import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/app/globals.css';
import Banner from '@/pages/banner';
import Navbar from '@/pages/navbar';
import Footer from '@/pages/footer';

const FilmsPage = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        if (!response.ok) {
          throw new Error('Failed to fetch films');
        }
        const data = await response.json();
        setFilms(data.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div>
      <Banner />
      <Navbar />
      <div className="h-0.5 bg-white w-full"></div>
      <h1 className="text-center"> Películas </h1>
      <div className="grid grid-cols-5 gap-4 justify-center">
        {films.map((film) => (
          <div key={film.url}>
            <Link href={`/films/${film.url.split('/').slice(-2)[0]}`} legacyBehavior>
              <a className="flex flex-col items-center">
                <img className="w-58 h-80" src="/images/films-images/generic-image.png" alt="Imagen genérica" />
                <h2 className="text-center">{film.title}</h2>
                <p className="text-center">Episodio: {film.episode_id}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
     
      <Footer />
      {error && <p>Error al cargar las películas: {error.message}</p>}
    </div>
  );
};
export default FilmsPage;
