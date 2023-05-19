
// LOGICA PARA HEADER Y PAGINA PRINCIPAL
// Inicializar Swiper con id=home
var swiper = new Swiper(".home", {
    // Espacio entre las diapositivas
    spaceBetween: 10,
  
    // Centrar las diapositivas
    centeredSlides: true,
  
    // Reproducción automática
    autoplay: {
      delay: 4000,  // Retardo entre diapositivas (en milisegundos)
      disableOnInteraction: false,  // No detener la reproducción al interactuar con el carrusel
    },
  
    // Paginación
    pagination: {
      el: ".swiper-pagination",  // Selector del elemento HTML donde se mostrará la paginación
      clickable: true,  // Permitir hacer clic en la paginación para navegar a una diapositiva específica
    }
  });

  // LOGICA PARA BOTÓN WATCH TRAILER
// Obtiene el elemento del botón "Watch Trailer" por su ID
const watchTrailerBtn = document.getElementById('watch-trailer-btn');

// Obtiene el contenedor del video por su ID
const videoContainer = document.getElementById('video-container');

// Agrega un event listener al botón "Watch Trailer" que se activa cuando se hace clic en él
watchTrailerBtn.addEventListener('click', () => {
  // Muestra el contenedor del video estableciendo su estilo display como "flex"
  videoContainer.style.display = 'flex';
});

// Agrega un event listener al contenedor del video que se activa cuando se hace clic en él
videoContainer.addEventListener('click', () => {
  // Oculta el contenedor del video estableciendo su estilo display como "none"
  videoContainer.style.display = 'none';
});