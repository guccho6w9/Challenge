import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
//bibliotecas de font awesome para algunos iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Banner from '@/pages/banner';
import Navbar from '@/pages/navbar';
import Footer from '@/pages/footer';

function HomePage() {
    //imagenes para el carrusel
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        "/images/carrusel/esperanza.jpeg",
        "/images/carrusel/imperio.jpeg",
        "/images/carrusel/retorno.jpeg"
    ];

    // Función para avanzar al siguiente imagen
    const nextImage = () => {
        setCurrentImage((currentImage + 1) % images.length);
    };

    // Función para retroceder a la imagen anterior
    const prevImage = () => {
        setCurrentImage((currentImage - 1 + images.length) % images.length);
    };

    // Función para cambiar automáticamente la imagen cada 5 segundos
    useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        return () => clearInterval(interval);
    }, [currentImage]);



    return (
        <div>
            <Banner /> 
            <Navbar /> 
            <div className="h-0.5 bg-white w-full"></div>
            <div className="text-center mt-8">
                <h1 className="text-4xl font-bold">¡Bienvenido a la Galaxia de Star Wars!</h1>
                <div className="carousel relative">
                    <button onClick={prevImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button onClick={nextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                    <img src={images[currentImage]} alt={`Slide ${currentImage + 1}`} className="w-full h-auto" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;