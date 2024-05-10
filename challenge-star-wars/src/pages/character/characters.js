import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Banner from '@/pages/banner';
import Navbar from '@/pages/navbar';
import Footer from '@/pages/footer';
import '@/app/globals.css';

const CharactersPage = () => {
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [filterOptions, setFilterOptions] = useState({
        eyeColor: 'all',
        gender: 'all'
    });
    const [showFilterMenu, setShowFilterMenu] = useState(false);

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

    useEffect(() => {
        // Filtrar personajes
        let filtered = characters.filter(character => {
            if (filterOptions.eyeColor !== 'all' && character.eye_color !== filterOptions.eyeColor) {
                return false;
            }
            if (filterOptions.gender !== 'all' && character.gender !== filterOptions.gender) {
                return false;
            }
            return true;
        });
        setFilteredCharacters(filtered);
    }, [characters, filterOptions]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleFilterOptionChange = (type, value) => {
        setFilterOptions(prevOptions => ({
            ...prevOptions,
            [type]: value
        }));
        // Regresar a la primera página cuando se cambian los filtros
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setFilterOptions({
            eyeColor: 'all',
            gender: 'all'
        });
    };

    return (
        <div>
            <Banner />
            <Navbar />
            <div className="h-0.5 bg-white w-full"></div>
            <h1 className="text-4xl text-center mt-4"> PERSONAJES </h1>

            <div className="flex justify-end mr-4">
                <div className="relative">
                    <FontAwesomeIcon
                        icon={faFilter}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                    />
                    {showFilterMenu && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md p-2">
                            <div>
                                <label htmlFor="eyeColor" className="mr-2 text-black"> Color de ojos </label>
                                <select
                                    id="eyeColor"
                                    className="border border-gray-300 rounded-md text-black"
                                    value={filterOptions.eyeColor}
                                    onChange={e => handleFilterOptionChange('eyeColor', e.target.value)}
                                >
                                    <option value="all">Todos</option>
                                    <option value="blue">Azul</option>
                                    <option value="brown">Marrón</option>
                                    <option value="green">Verde</option>
                                    <option value="yellow">Amarillo</option>
                                    <option value="red">Rojo</option>
                                </select>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="gender" className="mr-2 text-black"> Género </label>
                                <select
                                    id="gender"
                                    className="border border-gray-300 rounded-md text-black"
                                    value={filterOptions.gender}
                                    onChange={e => handleFilterOptionChange('gender', e.target.value)}
                                >
                                    <option value="all">Todos</option>
                                    <option value="male">Masculino</option>
                                    <option value="female">Femenino</option>
                                    <option value="n/a">N/A</option>
                                </select>
                            </div>
                            <button onClick={handleResetFilters} className="mt-2 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-black">Restablecer</button>
                        </div>
                    )}
                </div>
            </div>

            {loading && (
                <div className="flex justify-center mt-4">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-white" /> {/* Rueda de cargando color blanco */}
                </div>
            )}

            {!loading && (
                <div className="flex flex-wrap justify-center mt-4">
                    {filteredCharacters.map(character => (
                        <Link key={character.url} href={`/character/${character.url.split('/').slice(-2)[0]}`} legacyBehavior>
                            <a className="flex flex-col items-center justify-center space-y-2 m-2 w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/6 xl:w-1/6 p-2">
                                <div className="h-80 flex flex-col">
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

            <div className="flex justify-center mt-4">
                {currentPage > 1 && (
                    <button onClick={handlePrevPage} className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4 border border-white">Anterior</button>
                )}
                {currentPage < totalPages && (
                    <button onClick={handleNextPage} className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border border-white">Siguiente</button>
                )}
            </div>

            <Footer />
            {error && <p>Error al cargar los personajes: {error.message}</p>}
        </div>
    );
};

export default CharactersPage;
