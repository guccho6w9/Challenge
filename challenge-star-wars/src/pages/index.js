import React, { useState, useEffect, useRef } from 'react';
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
    const [showContent, setShowContent] = useState(false);
    const contentRef = useRef(null);
    //pequeño arreglo con las imagenes, id y titulo que muestran en el carrusel
    const images = [
        {
            src: "/images/carrusel/esperanza.jpg",
            title: "Una nueva esperanza",
            filmId: 1
        },
        {
            src: "/images/carrusel/imperio.jpg",
            title: "El Imperio contraataca",
            filmId: 2
        },
        {
            src: "/images/carrusel/retorno.jpg",
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


    //funcion que controla la animacion de la seccion que "guia para ver star wars"
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 
        };
    
        let lastY = 0;
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setShowContent(true);
                } else {
                    // Comprueba si el desplazamiento es hacia arriba
                    if (window.scrollY < lastY) {
                        setShowContent(false);
                    }
                }
                lastY = window.scrollY;
            });
        }, options);
    
        if (contentRef.current) {
            observer.observe(contentRef.current);
        }
    
        return () => {
            if (contentRef.current) {
                observer.unobserve(contentRef.current);
            }
        };
    }, []);
    



    return (
        <div>
            <Header />
            <Navbar />
            <div className="h-0.5 bg-white w-full mb-3"></div>
            <div className="text-center">
                <h1 className="text-1xl sm:text-1xl md:text-1x3 lg:text-2xl xl:text-4xl 2xl:text-10xl font-bold mb-5 mt-5"> TODO SOBRE TUS CLASICOS FAVORITOS </h1>

                {/* seccion de cuadro de carrusel */}
                <div className="carousel relative w-200  2xl:w-2/5 mx-auto mb-10 overflow-hidden">
                    <div className="relative ">
                        <Link legacyBehavior href={`/films/${images[currentImage].filmId}`}>
                            <a className='inline-block'>
                                <img src={images[currentImage].src} alt={`Slide ${currentImage + 1}`} className="w-full h-auto rounded-lg" />
                            </a>
                        </Link>
                        <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-2 h-full w-1/2 flex items-center justify-center">
                            <h2 className="text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-7xl text-lg font-bold">{images[currentImage].title}</h2>
                        </div>
                    </div>

                    {/* botones para mover imagenes hacia los lados */}
                    {/* moverse hacia la izquierda */}
                    <button onClick={prevImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full bg-opacity-50">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    {/* moverse hacia la derecha */}
                    <button onClick={nextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full bg-opacity-50">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>



                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mb-0">
                        {/* vista previa de las imagenes y puntos para moverse en el carrusel*/}
                        {images.map((image, index) => (
                            
                            <div key={index} onClick={() => handleImageClick(index)} className="relative">
                                <img
                                    src={image.src}
                                    alt={`Slide ${index + 1}`}
                                    className={`h-12 w-auto cursor-pointer ${currentImage === index ? 'blur' : ''} hidden lg:block mb-50`}
                                />
                                {/* barritas azules sobre los preview de la imagen */}
                                {currentImage != index && (
                                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 lg:block hidden"></div>
                                )}
                                {/* puntos para moverse */}
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    className={`sm:block hidden text-lg sm:text-xl lg:text-2xl xl:text-3xl cursor-pointer ${currentImage === index ? 'text-white' : 'text-gray-400'} lg:hidden mt-40`}
                                />
                            </div>
                        ))}
                    </div>
                </div>



                {/* seccion de slider largo de fondo blanco con texto, estilos definidos en globals.css para la animacion */}
                <div className="bg-white py-3 overflow-hidden">
                    <span className="text-black text-2x1 sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl 2xl:text-10x1 font-bold animate-marquee">
                        <span>LA AMENAZA FANTASMA REGRESA A LOS CINES ESTE 24 DE MAYO</span>
                        <span>LA AMENAZA FANTASMA REGRESA A LOS CINES ESTE 24 DE MAYO</span>
                        <span>LA AMENAZA FANTASMA REGRESA A LOS CINES ESTE 24 DE MAYO</span>
                    </span>
                </div>
                

                {/* seccion "guia para ver star wars" */}
                {/* Imagen y texto animado */}
                <div ref={contentRef} className={`transition-all duration-500 ${showContent ? 'opacity-100 transform scale-y-100' : 'opacity-0 transform scale-y-0'}`}>
                    <div className="flex flex-col items-center mt-16">
                        <div className="w-3/4 md:w-1/2 flex justify-center">
                            <img src="/images/index/guide.jpg" alt="Imagen" className="rounded-2xl max-h-96 animate-from-bottom" />
                        </div>
                        <div className="w-full sm:w-1/3 md:w-1/2 mt-8 md:mt-0 text-center">
                            <p className="text-md text-gray-400 mt-2">Nuevo en la galaxia?</p>
                            <h2 className="text-4xl sm:text-3x1 text-white font-bold">Star Wars guía para ver las películas y series</h2>
                            <p className="text-gray-400 mt-5">Si estás buscando saltar a Star Wars por primera vez, o eres un fanático desde hace mucho tiempo que se pone al día con los últimos lanzamientos, no temas; estamos aquí para rescatarte. Consulta las dos listas a continuación (orden de lanzamiento y orden cronológico) de cada película y serie de Star Wars, incluidas las de acción en vivo y animación, para ayudarte en tu viaje por esta galaxia.</p>
                            <button className="bg-yellow-300 text-black rounded  px-3 py-2 mt-4">Vamos</button>
                        </div>
                    </div>
                </div>



                {/* seccion "ultimas noticias" */}
                <div className="bg-white py-8">
                    <h2 className="text-2xl font-bold mb-4">Últimas Novedades</h2>
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-lg shadow-lg w-1/2 bg-gray-200 p-4 mr-2">
                            <img src="/images/placeholder.png" alt="Novedad 1" className="w-full h-auto mb-2" />
                            <p className="text-gray-700">Descripción de la novedad 1</p>
                        </div>
                        <div className="rounded-lg shadow-lg w-1/2 bg-gray-200 p-4 ml-2">
                            <img src="/images/placeholder.png" alt="Novedad 2" className="w-full h-auto mb-2" />
                            <p className="text-gray-700">Descripción de la novedad 2</p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Ver Todas</button>
                    </div>
                </div>
                



                <h2> hola </h2>
                
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
