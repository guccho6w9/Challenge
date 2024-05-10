import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Banner from '@/pages/banner';
import Navbar from '@/pages/navbar';
import Footer from '@/pages/footer';

const FilmDetailPage = () => {
    const router = useRouter();
    const [film, setFilm] = useState(null);
    const [characters, setCharacters] = useState([]);
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
            } catch (error) {
                setError(error);
            }
        };

        fetchFilm();
    }, [router.query.id]);

    if (!film) {
        return <div>Cargando...</div>;
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
                        <h1 className="text-3xl">{film.title}</h1>
                        <p>Episodio: {film.episode_id}</p>
                        <p>Director: {film.director}</p>
                        <p>Opening crawl: {film.opening_crawl}</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl">Personajes:</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {characters.map((character) => (
                            <div key={character.url}>
                                <Link href={`/character/${character.url.split('/').slice(-2)[0]}`} legacyBehavior>
                                    <a>
                                        <img className="w-full h-auto" src="/images/characters-images/generic-image.png" alt="Imagen genérica" />
                                        <p>{character.name}</p>
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
