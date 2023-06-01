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

  fetch("http://10.238.91.26:3001/api/usuarios/perfil", requestOptions)
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


// cargar datos de pelicula
document.addEventListener("DOMContentLoaded", cargarDatos)
function cargarDatos() {
  token = localStorage.getItem("token")
  console.log(token)
  if (!token) {
    location.href = "login.html"
  }
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://10.238.91.26:3001/api/movies", requestOptions)
    .then(response => response.json())
    .then(data => {
      let html = ``
      data.forEach((item) => {
        const releasedDate = item.released.substring(0, 10);
        html += `
          <div class="pelicula">
          <img src=${item.poster} alt="Poster de pelicula">
          <h3><a href="movie_info.html?id=${item._id}">${item.title}</a></h3>
          <p>${releasedDate}</p>
          </div>
          `
      })
      document.querySelector("#contenedor-peliculas").innerHTML = html
    })
    .catch(error => console.log('error', error));
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

  fetch("http://10.238.91.26:3001/api/movies", requestOptions)
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
