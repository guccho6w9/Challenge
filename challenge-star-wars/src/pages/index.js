
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; {/* decidi usar axios para traer los datos de la api*/}

function HomePage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // Realizar la solicitud a la API de SWAPI
        axios.get('https://swapi.dev/api/')
            .then(response => {
                setData(response.data); // Almacenar los datos en el estado
            })
            .catch(error => {
                setError(error); // Manejar errores si la solicitud falla
            });
    }, []); // Ejecutar solo una vez al montar el componente

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mt-8">¡Bienvenido a la Galaxia de Star Wars!</h1>


            {/*Div para los botones de las paginas peliculas y personajes*/}
            <div className="flex justify-center mt-4">
                <Link href="/films" legacyBehavior>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                        Ver Películas
                    </a>
                </Link>
                <Link href="/characters" legacyBehavior>
                    <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Ver Personajes
                    </a>
                </Link>
            </div>



            <div className="flex justify-center mt-4">
                {/* Mostrar los datos obtenidos de SWAPI si están disponibles para testear datos */}
                {data && (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                )}
                {/* Manejar errores si la solicitud falla */}
                {error && (
                    <p>Error al obtener datos de SWAPI: {error.message}</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;