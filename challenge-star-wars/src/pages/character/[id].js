//pagina detallada de personajes


import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
import Header from '@/components/header'; //importado banner.js
import Navbar from '@/components/navbar'; //importado navbar.js
import Footer from '@/components/footer'; //importado footer.js

const CharacterDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/people/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch character');
                }
                const data = await response.json();
                setCharacter(data);
            } catch (error) {
                setError(error);
            }
        };

        if (id) {
            fetchCharacter();
        }
    }, [id]);

    return (
        <div className="flex flex-col items-center min-h-screen">
            <Header />
            <Navbar />
            <div className="h-0.5 bg-white w-full " ></div>
            {character ? (
                <div className="text-center mb-40 ">
                    <h1 className="text-3xl font-bold mb-6 mt-4">{character.name}</h1>
                    <img src="/images/characters-images/generic-image.png" alt="Imagen genérica de personaje" className="h-76 w-64 mb-4" />
                    {character.birth_year !== 'n/a' && character.birth_year !== 'unknown' && (
                        <p>Año de nacimiento: {character.birth_year}</p>
                    )}
                    {character.hair_color !== 'n/a' && character.hair_color !== 'unknown' && (
                        <p>Color de pelo: {character.hair_color}</p>
                    )}
                    {character.eye_color !== 'n/a' && character.eye_color !== 'unknown' && (
                        <p>Color de ojos: {character.eye_color}</p>
                    )}
                    {character.skin_color !== 'n/a' && character.skin_color !== 'unknown' &&(
                        <p>Color de piel: {character.skin_color} </p>

                    )}
                    {character.height !== 'n/a' && character.height !== 'unknown' && (
                        <p>Altura: {character.height} cm</p>

                    )}


                    {character.mass !== 'n/a' && character.mass !== 'unknown' && (
                        <p>Masa: {character.mass} </p>

                    )}


                </div>
            ) : (
                <p className="mt-4">Cargando...</p>
            )}
            <Footer />
            {error && <p>Error: {error.message}</p>}
            
        </div>
    );
};

export default CharacterDetailPage;
