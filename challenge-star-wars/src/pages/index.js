import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import '@/app/globals.css';
import Header from '@/components/header'; //importado banner.js
import Navbar from '@/components/navbar'; //importado navbar.js
import Footer from '@/components/footer'; //importado footer.js






function HomePage() {
    const [currentImage, setCurrentImage] = useState(0);
    //pequeño arreglo con las imagenes, id y titulo que muestran en el carrusel
    const images = [
        {
            src: "/images/carrusel/esperanza.jpeg",
            title: "Una nueva esperanza",
            filmId: 1
        },
        {
            src: "/images/carrusel/imperio.jpeg",
            title: "El Imperio contraataca",
            filmId: 2
        },
        {
            src: "/images/carrusel/retorno.jpeg",
            title: "El retorno del Jedi",
            filmId: 3
        }
    ];

    // Función para moverse entre imágenes mediante los puntos y cuadros
    const handleImageClick = (index) => {
        setCurrentImage(index);
    };

    //funcio avanzar imagen
    const nextImage = () => {
        setCurrentImage((currentImage + 1) % images.length);
    };
    //funcion imagen previa
    const prevImage = () => {
        setCurrentImage((currentImage - 1 + images.length) % images.length);
    };
    //funcion que controla el cambio de imagenes cada 3 segundos, cambiar el valor 3000 para cambiar los segundos
    useEffect(() => {
        const interval = setInterval(nextImage, 3000);
        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div>
            <Header />
            <Navbar />

            {/* linea blanca que separa al navbar del body */}
            <div className="h-0.5 bg-white w-full mb-3"></div>


            <div className="text-center mt-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-10x1 font-bold">PELÍCULAS DESTACADAS </h1>

                {/* caja del carrusel */}
                <div className="carousel relative w-200 mb-40">

                    <div className="relative ">
                        <Link legacyBehavior href={`/films/${images[currentImage].filmId}`}>
                            <a>
                                <img src={images[currentImage].src} alt={`Slide ${currentImage + 1}`} className="w-full h-auto rounded-lg" />
                            </a>
                        </Link>
                        {/* Caja negra semitransparente con el título de la película en carrusel */}
                        <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-2 h-full w-1/2 flex items-center justify-center">
                            <h2 className="text-2x1 sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl text-lg font-bold">{images[currentImage].title}</h2>
                        </div>
                    </div>

                    {/* Botones para desplazarse entre las imágenes */}
                    {/* Botón izquierda */}
                    <button onClick={prevImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full bg-opacity-50">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    {/* Botón derecha */}
                    <button onClick={nextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full bg-opacity-50">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    {/* Puntos circulares para desplazarse entre imágenes */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mb-2">

                        {/* Crear puntos para cada imagen */}

                        {images.map((image, index) => (
                            <div key={index} onClick={() => handleImageClick(index)} className="relative">
                                {/* Vista previa de la imagen */}
                                <img
                                    src={image.src}
                                    alt={`Slide ${index + 1}`}
                                    className={`h-12 w-auto cursor-pointer ${currentImage === index ? 'blur' : ''} hidden lg:block mb-50`}
                                />
                                {/* Barra de color encima de la imagen si no tiene desenfoque */}
                                {currentImage != index && ( 
                                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div> 
                                )}

                                {/* Puntos en pantallas pequeñas */}
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl cursor-pointer ${currentImage === index ? 'text-white' : 'text-gray-400'} lg:hidden mt-40`}
                                />
                            </div>
                        ))}
                    </div>

                </div>
                <h2> hola </h2>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
