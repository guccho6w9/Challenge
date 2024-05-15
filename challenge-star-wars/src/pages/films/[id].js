//pagina detallada de peliculas


import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/header'; //importado banner.js
import Navbar from '@/components/navbar'; //importado navbar.js
import Footer from '@/components/footer'; //importado footer.js



const FilmDetailPage = () => {
    const router = useRouter();
    const [film, setFilm] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
    const [error, setError] = useState(null);


    //hook para traer la pelicula segun el id de la api, se traeran tambien la url de los personajes de la pelicula para mostrar sus datos
    // rueda de carga implementada
    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const filmId = router.query.id;
                const filmResponse = await fetch(`https://swapi.dev/api/films/${filmId}/`);
                const filmData = await filmResponse.json();
                setFilm(filmData);
                
                const charactersData = await Promise.all(
                    filmData.characters.map(async (characterUrl) => {
                        const response = await fetch(characterUrl);
                        return response.json();
                    })
                );
                setCharacters(charactersData);
                setLoading(false); 
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchFilm();
    }, [router.query.id]);

    //rueda de carga temporal, se asegura de que se traigan todos los datos antes de mostrar la pagina real
    if (loading) {
        return (
            <div>
                <Header />
                <Navbar />
                <div className="h-0.5 bg-white w-full"></div>
                <div className="flex justify-center mt-4">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-white" /> {/* Rueda de cargando color blanco */}
                </div>
                <Footer />
            </div>
        );
    }

    //en algun caso de error de conexion se visualiza este mensaje
    if (!film) {
        return <div>No se pudo cargar la película.</div>;
    }

    return (
        <div>
            <Header />
            <Navbar />

            {/* linea blanca que separa el navbar del body */}
            <div className="h-0.5 bg-white w-full"></div>

            
            <div className="container mx-auto py-8">

                {/* caja con la info de la pelicula */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 mx-4">
                    <div>
                        <img className="h-auto w-full" src="/images/films-images/generic-image.png" alt="Imagen genérica" />
                    </div>
                    <div>
                        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-8x1 mb-1">{film.title}</h1>
                        <h2 className='text-3x1 sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4x1'>Episodio: {film.episode_id}</h2>
                        <p className='mb-2'>Director: {film.director}</p>
                        {/* decidi traer el opening crawl solo porque se ve un poco mejor la pagina, no es parte de ningun requisito */}
                        <p>Opening crawl: {film.opening_crawl}</p>
                    </div>
                </div>

                {/* caja con los personajes */}
                <div>
                    <div className="h-0.5 bg-white w-full mb-6"></div>
                    <h2 className="text-3xl font-bold mb-5"> Personajes </h2>
                    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mx-4">
                        {characters.map((character) => (
                            <div key={character.url}>
                                <Link href={`/character/${character.url.split('/').slice(-2)[0]}`} legacyBehavior>
                                    <a>
                                        <img className="w-full h-auto mb-2" src="/images/characters-images/generic-image.png" alt="Imagen genérica" />
                                        <p className='font-bold'>{character.name}</p>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
            {error && <p>Error al cargar los detalles de la película: {error.message}</p>}
        </div>
    );
};

export default FilmDetailPage;
