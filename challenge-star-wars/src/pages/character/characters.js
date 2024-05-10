import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Banner from '@/pages/banner';
import Navbar from '@/pages/navbar';
import Footer from '@/pages/footer';
import '@/app/globals.css';

const CharactersPage = () => {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/people/?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch characters');
                }
                const data = await response.json();
                setCharacters(data.results);
                setTotalPages(Math.ceil(data.count / 10)); // Calcula el total de páginas, 10 personas por página
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div>
            <Banner />
            <Navbar />
            <div className="h-0.5 bg-white w-full"></div>
            <h1 className="text-center">Personajes de Star Wars</h1>
            {loading && <p className="text-center">Cargando...</p>}
            {!loading && (
                <div className="flex flex-wrap justify-center">
                    {characters.map(character => (
                        <Link key={character.url} href={`/character/${character.url.split('/').slice(-2)[0]}`} legacyBehavior>
                            <a className="flex flex-col items-center justify-center space-y-2 m-2 w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/6 xl:w-1/6 p-2">
                                <div className="h-80 flex flex-col ">
                                    <img src="/images/characters-images/generic-image.png" alt="Imagen genérica de personaje" className="w-38 h-auto" />
                                    <div className="text-center">
                                        <h2 className="text-lg">{character.name}</h2>
                                        {character.eye_color !== 'n/a' && character.eye_color !== 'unknown' && (
                                            <p>Color de ojos: {character.eye_color}</p>
                                        )}
                                        {character.gender !== 'n/a' && character.gender !== 'unknown' && (
                                            <p>Género: {character.gender}</p>
                                        )}
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            )}
            {/* Botones de paginación */}
            <div className="flex justify-center mt-4">
                {currentPage > 1 && (
                    <button onClick={handlePrevPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Anterior</button>
                )}
                {currentPage < totalPages && (
                    <button onClick={handleNextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Siguiente</button>
                )}
            </div>
            <Footer />
            {/* Manejo de errores */}
            {error && <p>Error al cargar los personajes: {error.message}</p>}
        </div>
    );
    
};

export default CharactersPage;
