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
// IP CONEXION PARA FECTH
const IP = "192.168.100.14"


// eventos
document.addEventListener("DOMContentLoaded", cargarUser)

function cargarUser() {
  token = localStorage.getItem("token")
  if (!token) {
    location.href = "login.html"
  }
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  console.log(token)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`${URL}/usuarios/perfil`, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let html

      // asignamos el nombre a la variable global
      if (data.tipo.toString() === "2") {
        tipo = "Usuario"
        html = ` 
          <div class="name">${data.nombre}</div>
          <div class="category">${tipo}</div>
          <div class="email">${data.email}</div>
          <div class="logaut"><a onclick="cerrar()">Cerrar Sesion</a></div>
              `
      } else {
        tipo = "Admin"
        html = ` 
      <div class="name">${data.nombre}</div>
      <div class="category">${tipo}</div>
      <div class="email">${data.email}</div>
      <div class="logaut"><a onclick="cerrar()">Cerrar Sesion</a></div>
          `
      }
      document.querySelector("#account-details").innerHTML = html
    })
    .catch(error => console.log('error', error));
}


function cerrar() {
  localStorage.removeItem("token")
  localStorage.removeItem("email")
  localStorage.removeItem("password")
  localStorage.removeItem("tipo")
  location.href = "login.html"
}


// cargar peliculas
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

  fetch(`${URL}/movies`, requestOptions)
    .then(response => response.json())
    .then(data => {
      let html = ``
      data.forEach((item)=>{
        const releasedDate = item.released.substring(0, 10);
        html+= `
        <div class="pelicula">
        <img src=${item.poster} alt="Poster de pelicula">
        <h3><a class="enlace" href="movie_info.html?id=${item._id}">${item.title}</a></h3>
        <p>${releasedDate}</p>
        </div>
        `
      })
      document.querySelector("#contenedor-peliculas").innerHTML=html
    })
    .catch(error => console.log('error', error));
}



// FUNCION BUSCAR PELICULAS
// Evento de escucha para el botón de búsqueda
// MAIN SEARCH BAR
document.querySelector(".boton-buscar").addEventListener("click", buscarPelicula);

// Función para buscar película
function buscarPelicula() {
  const titulo = document.querySelector("#buscar");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    // En caso que uno este vacio buscara en otro valor y viceversa
    // al no encontrar nada devolvera todas las peliculas
    "title": titulo.value 
  });
  
  console.log(titulo.value)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`${URL}/movies/search`, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Procesar los resultados de búsqueda
      let html = '';
      data.forEach((item) => {
        const releasedDate = item.released.substring(0, 10);
        html += `
          <div class="pelicula">
            <img src=${item.poster} alt="Poster de pelicula">
            <h3><a class="enlace" href="movie_info.html?id=${item._id}">${item.title}</a></h3>
            <p>${releasedDate}</p>
          </div>
        `;
      });
      document.querySelector("#contenedor-peliculas").innerHTML = html;
    })
    .catch(error => console.log('error', error));
}
