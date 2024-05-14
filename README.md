# Neowyze_challenge
# Aplicacion web con motivo de peliculas de Star Wars

## instalar la biblioteca font awesome para los iconos!!

- iconos basicos:

npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome  
- iconos de marcas como whatsapp o linkedin: 

npm install @fortawesome/free-brands-svg-icons

### Este es una aplicacion web que permite acceder a la informacion de las peliculas y personajes de star wars con la api Swapi.

# Características Principales

- Componentes Modulares: La aplicación está estructurada con componentes modulares como el encabezado (Header) con logotivo de star wars que lleva al index, la barra de navegación con botones para desplzarse entre las paginas (Navbar) y el pie de página (Footer) con info de contacto, facilitando su reutilización y mantenimiento en diferentes páginas y plantillas.

- Página de Inicio (Index): Incluye un carrusel de imágenes responsive que muestra acceso directo a 3 clasicos de Star Wars, permitiendo a los usuarios explorarlas fácilmente.
Posee botones para moverse en el carrusel de izquierda a derecha, botones circulares para eligar una imagen en pantallas medianas y vista previa de la imagen como navegacion en pantallas grandes.

- Slider de Noticias en loop: Un slider que muestra noticias relevantes del universo Star Wars con texto en un loop continuo, proporcionando información actualizada de manera dinámica.

- Seccion guia para ver star wars: un desplegable con animacion que aparece al desplegarse hacia abajo, muestra una imagen, info basica y un boton no funcional, al desplazarse hacia arriba desaparece con animacion.

- Sección de Últimas Novedades: Presenta las noticias en forma de un slider, con botones de navegación para desplazarse entre ellas, las imagenes y texto de la noticia estan guardadas en un pequeño array.

- Pagina de error 404 personaliada en caso de acceder a una url que no existe 

- ### Página de Películas (Films): Una página dedicada a listar todas las películas de Star Wars, con imágen generica, nombre y episodio, permitiendo a los usuarios acceder fácilmente a información detallada sobre cada película.

- Página de Detalles de Películas: Proporciona información detallada sobre una película seleccionada, incluyendo imágen generica, título, episodio, director y el famoso opening crawl solo por estetica, así como una lista de personajes que aparecen en esa película y su url.

- ### Página de Personajes (Characters): Ofrece una lista paginada de todos los personajes de Star Wars traida desde la api en su totalidad antes de cargar, con la capacidad de filtrarlos por color de ojos, género o ambos, lo que permite una navegación fácil, fluida y personalizada. Tambien posee una imagen y texto notificando si ningun personaje entra en el filtro.

- Página de Detalles de Personajes: Muestra información detallada de un personaje seleccionado, incluyendo nombre, altura, masa, año de nacimiento, color de pelo, piel y ojos, proporcionando una visión más profunda de los personajes favoritos de los usuarios.


 