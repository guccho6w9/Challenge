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
    const [currentIndex, setCurrentIndex] = useState(0);

    const [currentPair, setCurrentPair] = useState(0); // Maneja el par de novedades actual

    const prevPair = () => {
        setCurrentPair((currentPair - 1 + novedades.length / 2) % (novedades.length / 2));
    };

    const nextPair = () => {
        setCurrentPair((currentPair + 1) % (novedades.length / 2));
    };

    // Calcula los índices de las novedades actuales
    const firstIndex = currentPair * 2;
    const secondIndex = firstIndex + 1;

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

    // arreglo de imagenes para la seccion de novedades
    const novedades = [
        { src: "/images/index/novedades.jpeg", texto: "¿Entró toda? Nuevas imagenes ineditas muestran que efectivamente..." },
        { src: "/images/index/novedades2.jpeg", texto: "Star wars llego a Fornite, enterate de todo lo que..." },
        { src: "/images/index/novedades3.jpeg", texto: "Una retrospectiva del 25 aniversario de la amenaza fantasma" },
        { src: "/images/index/novedades4.jpeg", texto: "Como un grupo de fanaticos salvo las peliculas originales" },
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
            threshold: 0.2
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
                <h1 className="text-1xl sm:text-1xl md:text-1x3 lg:text-2xl xl:text-2xl 2xl:text-10xl font-bold mb-5 mt-5"> TODO SOBRE TUS CLASICOS FAVORITOS </h1>

                {/* seccion de cuadro de carrusel */}
                <div className="carousel relative w-200   2xl:w-2/3 mx-auto mb-10 overflow-hidden">
                    <div className="relative ">
                        <Link legacyBehavior href={`/films/${images[currentImage].filmId}`}>
                            <a className='inline-block'>
                                <img src={images[currentImage].src} alt={`Slide ${currentImage + 1}`} className="w-full h-auto rounded-lg" />
                            </a>
                        </Link>
                        {/* caja negra con el titulo */}
                        <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white p-2 h-full w-1/2 flex items-center justify-start">
                            <h2 className="text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-6xl  text-lg font-bold">{images[currentImage].title}</h2>
                        </div>
                    </div>

                    {/* moverse hacia la izquierda */}
                    <button onClick={prevImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full border border-white bg-opacity-50 active:bg-gray-700 active:bg-opacity-75">
                        <FontAwesomeIcon icon={faChevronLeft} size='2x'/>
                    </button>
                    {/* moverse hacia la derecha */}
                    <button onClick={nextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full border border-white bg-opacity-50 active:bg-gray-700 active:bg-opacity-75">
                        <FontAwesomeIcon icon={faChevronRight} size='2x'/>
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
                    <div className="flex flex-col items-center mt-16 mb-16">
                        <div className="w-3/4 md:w-1/2 flex justify-center">
                            <img src="/images/index/guide.jpg" alt="Imagen" className="rounded-2xl max-h-96 animate-from-bottom" />
                        </div>
                        <div className="w-full sm:w-1/3 md:w-1/2 mt-8 md:mt-0 text-center">
                            <p className="text-md text-gray-400 mt-2">Nuevo en la galaxia?</p>
                            <h2 className="text-4xl sm:text-3x1 text-white font-bold">Star Wars: Guía para ver las películas y series</h2>
                            <p className="text-md lg:text-md text-gray-400 mb-5 mt-5">Si estás buscando saltar a Star Wars por primera vez, o eres un fanático desde hace mucho tiempo que se pone al día con los últimos lanzamientos, no temas; estamos aquí para rescatarte. Consulta las dos listas a continuación (orden de lanzamiento y orden cronológico) de cada película y serie de Star Wars, incluidas las de acción en vivo y animación, para ayudarte en tu viaje por esta galaxia.</p>
                            <button className="w-40 bg-yellow-300 text-black font-bold px-3 py-4 rounded-full self-end lg:self-auto mt-4 lg:mt-0"> Vamos! </button>
                        </div>
                    </div>
                </div>



                {/* Sección "Últimas Novedades" */}
                <div className="bg-white py-3 relative mb-20">
                    {/* título y botón "Ver Todas" */}
                    <div className='mb-2 lg:flex lg:justify-between items-center'>
                        <h2 className="text-2xl text-black font-bold lg:self-start">Últimas Novedades</h2>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-full self-end lg:self-auto mt-4 font-bold lg:mt-0">Ver Todas</button>
                    </div>
                    {/* botones para moverse entre novedades */}
                    <button onClick={prevPair} className="absolute text-white absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 bg-opacity-50 rounded active:bg-gray-700 active:bg-opacity-75 z-10">
                        <FontAwesomeIcon icon={faChevronLeft} size="4x" />
                    </button>
                    <button onClick={nextPair} className="absolute text-white absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 bg-opacity-50 rounded active:bg-gray-700 active:bg-opacity-75 z-10">
                        <FontAwesomeIcon icon={faChevronRight} size="4x" />
                    </button>

                    {/* Caja de novedades */}
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-center items-center lg:items-start mt-8 mb-20 lg:mt-14">
                        <div onClick={() => { }} className="lg:w-80 bg-gray-200 p-4 mx-2 mb-4 lg:mb-0 relative cursor-pointer">
                            <img src={novedades[firstIndex].src} alt={`Novedad ${firstIndex + 1}`} className="w-full h-52 lg:h-80 object-cover" />
                            <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2">
                                <p>{novedades[firstIndex].texto.substring(0, 50)}...</p>
                            </div>
                        </div>
                        <div onClick={() => { }} className="lg:w-80 bg-gray-200 p-4 mx-2 mb-4 lg:mb-0 relative cursor-pointer">
                            <img src={novedades[secondIndex].src} alt={`Novedad ${secondIndex + 1}`} className="w-full h-52 lg:h-80 object-cover" />
                            <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2">
                                <p>{novedades[secondIndex].texto.substring(0, 50)}...</p>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
