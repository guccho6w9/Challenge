import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSpinner, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Header from '@/components/header'; //importado banner.js
import Navbar from '@/components/navbar'; //importado navbar.js
import Footer from '@/components/footer'; //importado footer.js
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
    const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(null);



    // Hook de efecto para cargar los personajes desde la API, decidi usar un bucle con promise para traer todas las paginas de personajes de una vez por la limitacion de swapi de tener solo 10 personajes por pagina, tarde solo un poco mas al cargar la primera vez, luego de eso la navegacion es mas fluida
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const promises = [];
                for (let i = 1; i <= 9; i++) {
                    promises.push(fetch(`https://swapi.dev/api/people/?page=${i}`));
                }
                const responses = await Promise.all(promises);
                const data = await Promise.all(responses.map(response => response.json()));
                const allCharacters = data.flatMap(page => page.results);
                setCharacters(allCharacters);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    // Hook de efecto para filtrar los personajes cuando cambian los filtros
    useEffect(() => {
        let filtered = characters.filter(character => {
            if (filterOptions.eyeColor !== 'all') {
                const eyeColors = character.eye_color.split(',').map(color => color.trim());
                if (!eyeColors.includes(filterOptions.eyeColor)) {
                    return false;
                }
            }
            //no estaba especificado en el pdf el genero "none" asi que lo filtro junto a n/a aqui en la funcion, se muestra en el sistema
            if (filterOptions.gender !== 'all') {
                if (filterOptions.gender === 'n/a') {
                    // si se selecciona "No especificado", filtrara tanto "n/a" como "none"
                    return character.gender === 'n/a' || character.gender === 'none';
                } else {
                    return character.gender === filterOptions.gender;
                }
            }
            return true;
        });

        setFilteredCharacters(filtered);
        const totalPages = Math.ceil(filtered.length / 10);
        setTotalPages(totalPages);
        setCurrentPage(1);
    }, [characters, filterOptions]);

    //obteniene los personajes para la página actual
    const paginatedCharacters = filteredCharacters.slice((currentPage - 1) * 10, currentPage * 10);

    //funcion para moverse a siguiente pagina
    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
    //funcion para ir a la pagina anterior
    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    //maneja las opciones de filtro al cambiarlo
    const handleFilterOptionChange = (type, value) => {
        setFilterOptions(prevOptions => ({
            ...prevOptions,
            [type]: value
        }));
    };
    //retablece los filtros
    const handleResetFilters = () => {
        setFilterOptions({
            eyeColor: 'all',
            gender: 'all'
        });
    };


    //funciones de hover
    const handleCharacterMouseEnter = (index) => {
        setSelectedCharacterIndex(index);
    };

    const handleCharacterMouseLeave = () => {
        setSelectedCharacterIndex(null);
    };


    return (


        <div style={{ position: 'relative' }}>

            <Header />
            <Navbar />
            <div className="h-0.5 bg-white w-full mb-6"></div>
            <h1 className="text-4xl text-center font-bold mb-6"> PERSONAJES </h1>

            <div className="flex justify-end mr-4">
                <div className="relative">
                    <FontAwesomeIcon
                        icon={faFilter}
                        className="text-gray-500 cursor-pointer" size="2x"
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                    />
                    {showFilterMenu && (
                        <div className="absolute top-10 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md p-2 z-10">
                            <div>
                                <label htmlFor="eyeColor" className="mr-2 text-black"> Color de ojos </label>
                                <select
                                    id="eyeColor"
                                    className="border border-gray-300 rounded-md text-black"
                                    value={filterOptions.eyeColor}
                                    onChange={e => handleFilterOptionChange('eyeColor', e.target.value)}
                                >
                                    <option value="all">Todos</option>
                                    <option value="black">Negro</option>
                                    <option value="blue">Azul</option>
                                    <option value="brown">Marrón</option>
                                    <option value="green">Verde</option>
                                    <option value="yellow">Amarillo</option>
                                    <option value="red">Rojo</option>
                                    <option value="white">Blanco</option>
                                    <option value="pink">Rosa</option>
                                    <option value="gold">Oro</option>
                                    <option value="blue-gray">Gris-azulado</option>
                                    <option value="orange">Naranja</option>
                                    <option value="hazel">Avellana</option>
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
                                    <option value="hermaphrodite">Hermafrodita</option>
                                    <option value="n/a">No especificado</option>
                                </select>
                            </div>
                            <button onClick={handleResetFilters} className="mt-2 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-black">Restablecer</button>
                        </div>
                    )}
                </div>
            </div>

            {loading && (
                <div className="flex justify-center mt-4">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-white" />
                </div>
            )}

            {!loading && filteredCharacters.length === 0 ? ( // Check if there are no matches
                <div className="flex flex-col items-center mt-4">
                    <img src="/images/characters-images/no-match.png" alt="No hay coincidencias" className="h-60 w-60 mb-4" />
                    <p className='mb-3 text-center'>"¡Meesa buscando, pero no meesa encontrar nada! ¡Parece que estamos en el lugar equivocado!"</p>
                    <p className='font-bold text-lg'>No se encontraron resultados </p>

        
                </div>
            ) : (
                <div className="flex flex-wrap justify-center mt-4 mb-10">
                    {paginatedCharacters.map((character, index) => (
                        <Link key={character.url} href={`/character/${character.url.split('/').slice(-2)[0]}`} legacyBehavior>

                            {/* caja de personajes, mostrara 5 personajes por fila en pantallas grandes, 3 en tables y 2 en celulares. tiene efecto hover */}
                            <a
                                className="flex flex-col items-center justify-center space-y-2 m-2 w-1/3 sm:w-1/5 md:w-1/4 lg:w-1/6 xl:w-1/5 p-2 hover:bg-white hover:bg-opacity-15 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105 relative"
                                onMouseEnter={() => handleCharacterMouseEnter(index)}
                                onMouseLeave={handleCharacterMouseLeave}
                            >
                                {/* informacion de los personajes traida de la api */}
                                <div className="h-80 flex flex-col">
                                    <img src="/images/characters-images/generic-image.png" alt="Imagen genérica de personaje" className="w-38 h-auto mb-3" />
                                    <div className="text-center">
                                        <h2 className="text-lg font-bold">{character.name}</h2>
                                        {character.eye_color !== 'n/a' && character.eye_color !== 'unknown' && (
                                            <p>Color de ojos: {character.eye_color}</p>
                                        )}
                                        {character.gender !== 'n/a' && character.gender !== 'unknown' && (
                                            <p>Género: {character.gender}</p>
                                        )}

                                        {/* icono que agregue que aparece al hacerle hover al personaje, es solo estetico */}
                                        {selectedCharacterIndex === index && (
                                            <div className=" bottom-0">
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    className="text-white text-2xl"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            )}

            {/* botones para moverse entre el paginado */}
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
