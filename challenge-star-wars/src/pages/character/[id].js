import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
import Banner from '@/pages/banner';
import Navbar from '@/pages/navbar';
import Footer from '@/pages/footer';

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
        <div>
            <Banner />
            <Navbar />
            <div className="h-0.5 bg-white w-full"></div>
            {character ? (
                <div>
                    <h1>{character.name}</h1>
                    <img src="/images/characters-images/generic-image.png" alt="Imagen genérica de personaje" className="h-76 w-64" />
                    {character.eye_color !== 'n/a' && character.eye_color !== 'unknown' && (
                        <p>Color de ojos: {character.eye_color}</p>
                    )}
                    <p>Año de nacimiento: {character.birth_year}</p>
                    {character.hair_color !== 'n/a' && character.hair_color !== 'unknown' && (
                        <p>Color de pelo: {character.hair_color}</p>
                    )}
                    <p>Altura: {character.height} cm</p>
                    <p>Color de piel: {character.skin_color}</p>
                    <p>Masa: {character.mass} </p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
            {error && <p>Error: {error.message}</p>}
            <Footer />
        </div>
    );
};

export default CharacterDetailPage;
