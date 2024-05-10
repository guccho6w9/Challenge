import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '@/app/globals.css';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Banner from '@/pages/banner';
import Navbar from '@/pages/navbar';
import Footer from '@/pages/footer';

function HomePage() {
    const [currentImage, setCurrentImage] = useState(0);
    const images = [
        {
            src: "/images/carrusel/esperanza.jpeg",
            title: "Una nueva esperanza"
        },
        {
            src: "/images/carrusel/imperio.jpeg",
            title: "El Imperio contraataca"
        },
        {
            src: "/images/carrusel/retorno.jpeg",
            title: "El retorno del Jedi"
        }
    ];
    //funcion para moverse entre imagenes mediante los puntos
    const handleImageClick = (index) => {
        setCurrentImage(index);
    };

    const nextImage = () => {
        setCurrentImage((currentImage + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((currentImage - 1 + images.length) % images.length);
    };

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
                <h1 className="text-4xl font-bold">Peliculas destacadas </h1>
                <div className="carousel relative w-200">
                    
                    <div className="relative">
                        <img src={images[currentImage].src} alt={`Slide ${currentImage + 1}`} className="w-full h-auto rounded-lg" />
                        {/* caja negra con el titulo de la pelicula en carrusel */}
                        <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-2 h-full w-1/2 flex items-center justify-center">
                            <h2 className="sm:text-3xl lg:text-6xl xl:text-7xl text-lg font-bold">{images[currentImage].title}</h2>
                        </div>
                    </div>

                    {/* botones para desplazarse entre entre las imagenes  */}
                    {/* boton izqquierda  */}
                    <button onClick={prevImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    {/* boton derecha  */}
                    <button onClick={nextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>


                    {/* puntos circulares para desplazarse entre imagenes  */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {/* crear puntos para cada imagen */}
                        {images.map((_, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={faCircle}
                                className={`text-2xl sm:text-1xl lg:text-2xl xl:text-3xl cursor-pointer ${currentImage === index ? 'text-white' : 'text-gray-400'}`}
                                onClick={() => handleImageClick(index)}
                            />
                        ))}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
