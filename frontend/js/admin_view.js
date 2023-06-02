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
  document.addEventListener("DOMContentLoaded",cargarDatosUsuario)

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
          <h3><a href="movie_info.html?id=${item._id}">${item.title}</a></h3>
          <p>${releasedDate}</p>
          <div class="botones">
          <button class="editar" onClick="editarPelicula('${item._id}')"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="eliminar" onClick="eliminarPelicula('${item._id}')")><i class="fa-solid fa-trash"></i></button>
          </div>
          </div>
          `
        })
        document.querySelector("#contenedor-peliculas").innerHTML=html
      })
      .catch(error => console.log('error', error));
  }

  //Funcion de eliminar pelicula
  function eliminarPelicula(id){
  
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
    
      fetch(`${URL}/movies/card?id=${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          location.reload();
        })
        .catch(error => console.log('error', error));
    }
  }

//Funcion de editar pelicula
function editarPelicula(id){
  localStorage.setItem('id',id)
  location.href="editar-pelicula.html"
}


function cargarDatosUsuario(){
  token = localStorage.getItem("token")
  console.log(token)
    if (!token){
        location.href="login.html"
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${URL}/usuarios/perfil`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let html = ``
   
          html+=`
          <div class="name">${data.nombre}</div>
          <div class="category">Admin</div>
          <div class="email">${data.email}</div>
          <div class="logaut"><a onclick="cerrar()">Cerrar Sesion</a></div>
          `

        document.querySelector("#usuarioInfo").innerHTML=html
      })
      .catch(error => console.log('error', error));
}
  function cerrar(){
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("tipo")
    location.href="login.html"
  }