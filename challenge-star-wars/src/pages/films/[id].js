import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Banner from '@/pages/banner';
import Navbar from '@/pages/navbar';
import Footer from '@/pages/footer';

const FilmDetailPage = () => {
    const router = useRouter();
    const [film, setFilm] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos
    const [error, setError] = useState(null);

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
                setLoading(false); // Marcar como completada la carga de datos
            } catch (error) {
                setError(error);
                setLoading(false); // Marcar como completada la carga de datos
            }
        };

        fetchFilm();
    }, [router.query.id]);

    if (loading) {
        return (
            <div>
                <Banner />
                <Navbar />
                <div className="h-0.5 bg-white w-full"></div>
                <div className="flex justify-center mt-4">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-white" /> {/* Rueda de cargando color blanco */}
                </div>
                <Footer />
            </div>
        );
    }

    if (!film) {
        return <div>No se pudo cargar la película.</div>;
    }

    return (
        <div>
            <Banner />
            <Navbar />
            <div className="h-0.5 bg-white w-full"></div>
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <img className="h-auto w-full" src="/images/films-images/generic-image.png" alt="Imagen genérica" />
                    </div>
                    <div>
                        <h1 className="text-5xl mb-6">{film.title}</h1>
                        <h2 className='text-3x1'>Episodio: {film.episode_id}</h2>
                        <p>Director: {film.director}</p>
                        <p>Opening crawl: {film.opening_crawl}</p>
                    </div>
                </div>
                <div>
                    <div className="h-0.5 bg-white w-full mb-6"></div>
                    <h2 className="text-3xl font-bold mb-5"> Personajes </h2>
                    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">
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
