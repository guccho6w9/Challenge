import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '@/app/globals.css';
import Header from '@/components/header'; //importado banner.js
import Navbar from '@/components/navbar'; //importado navbar.js
import Footer from '@/components/footer'; //importado footer.js



const FilmsPage = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
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
        setLoading(false); // Marcar como completada la carga de datos
      } catch (error) {
        setError(error);
        setLoading(false); // Marcar como completada la carga de datos
      }
    };

    fetchFilms();
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      <div className="h-0.5 bg-white w-full mb-6"></div>
      <h1 className="text-center text-4xl font-bold mb-12"> PELÍCULAS </h1>

      {/* Mostrar la rueda de carga si loading es verdadero */}
      {loading && (
        <div className="flex justify-center mt-4">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-white" /> {/* Rueda de cargando color blanco */}
        </div>
      )}

      {/* Mostrar las películas si loading es falso */}

      {/* Contenedor de peliculas */}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-center mb-40 min-h-screen">
          {films.map((film) => (
            
            <div key={film.url} className="hover:bg-red-300 hover:bg-opacity-35 h-96 rounded-lg transition duration-300">{/* hover sobre las cajas de peliculas */}
              <Link href={`/films/${film.url.split('/').slice(-2)[0]}`} legacyBehavior>
                <a className="flex flex-col items-center">
                  <img className="w-58 h-80" src="/images/films-images/generic-image.png" alt="Imagen genérica" />
                  {/* titulo de pelicula */}
                  <h2 className="text-center font-bold">{film.title}</h2>
                  {/* episodio */}
                  <p className="text-center">Episodio: {film.episode_id}</p>
                </a>
              </Link>
            </div>
          ))}
          
        </div>
        
      )}
      

      
      {error && <p>Error al cargar las películas: {error.message}</p>}
      <Footer />
    </div>
  );
};

export default FilmsPage;
