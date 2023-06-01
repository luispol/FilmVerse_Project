// Logica para boton de mostrar informacion de usuario
function toggleAccountInfo() {
    const accountInfo = document.querySelector('.account-info');
    const notificationContent = document.querySelector('.notification-content');
    // Cerrar el contenido de notificaciones si está abierto
    if (notificationContent.classList.contains('visible')) {
      notificationContent.classList.remove('visible');
    }
    // Alternar la visibilidad del contenido de la cuenta
    accountInfo.classList.toggle('visible'); 
  }
  
  // Logica para boton de mostrar informacion de notificaciones
  function toggleNotificationContent() {
    const accountInfo = document.querySelector('.account-info');
    const notificationContent = document.querySelector('.notification-content');
  
    // Cerrar el contenido de la cuenta si está abierto
    if (accountInfo.classList.contains('visible')) {
      accountInfo.classList.remove('visible');
    }
  
    // Alternar la visibilidad del contenido de notificaciones
    notificationContent.classList.toggle('visible'); 
  }
  

  //Variables
  let token
  //Eventos
  
  document.addEventListener("DOMContentLoaded",cargarDatos)
  
  function cargarDatos(){
    token = localStorage.getItem("token")
    if (!token){
        location.href="login.html"
    }
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
  
    fetch("http://192.168.100.14:3001/api/movies", requestOptions)
      .then(response => response.json())
      .then(data => {
        let html = ``
        data.forEach((item)=>{
          const releasedDate = item.released.substring(0, 10);
          html+= `
          <div class="pelicula">
          <img src=${item.poster} alt="Poster de pelicula">
          <h3><a href="movie_info.html?id=${item._id}">${item.title}</a></h3>
          <p>${releasedDate}</p>
          </div>
          `
        })
        
        document.querySelector("#contenedor-peliculas").innerHTML=html
      })
      .catch(error => console.log('error', error));
  }