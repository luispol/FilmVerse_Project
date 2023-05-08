
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