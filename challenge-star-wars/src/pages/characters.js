import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
 
const CharactersPage = () => {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
                setCharacters(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 10)); // Calcula el total de páginas, 10 personas por pagina 
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
            <h1>Personajes de Star Wars</h1>
            {loading && <p>Cargando...</p>}
            {!loading && (
                <div>
                    {characters.map(character => (
                        <div class="w-24 h-20" key={character.url}>
                            <img class="character-image object-cover" src="/images/characters-images/generic-image.png" alt="Imagen genérica de personaje" />
                            <h2>{character.name}</h2>
                            <p>Género: {character.gender}</p>
                            <p>Color de ojos: {character.eye_color}</p>

                        </div>
                    ))}
                    <div>
                        {currentPage > 1 && (
                            <button onClick={handlePrevPage}>Anterior</button>
                        )}
                        {currentPage < totalPages && (
                            <button onClick={handleNextPage}>Siguiente</button>
                        )}
                    </div>
                </div>
            )}
            {/* Botón de volver */}
            <Link href="/" legacyBehavior>
                <a>Volver a la página principal</a>
            </Link>
            {error && <p>Error al cargar los personajes: {error.message}</p>}
        </div>
    );
};

export default CharactersPage;