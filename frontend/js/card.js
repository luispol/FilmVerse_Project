// variables
let token;
// al cargar la pagina se cargara nombre del usuario y se podra utilizar en cualquier lugar.
let nombre;


// Eventos
// GET USER
document.addEventListener("DOMContentLoaded", cargarUser)

function cargarUser() {
  console.log("estamos cargando usuario")
  console.log(token);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://192.168.100.14:3001/api/usuarios/perfil", requestOptions)
    .then(response => response.json())
    .then(data => {
      let html

      // asignamos el nombre a la variable global
      if (data.tipo.toString() === "2") {
        tipo = "Usuario"
        html = ` 
          <div class="name">${data.nombre}</div>
          <div class="category">${tipo}</div>
          <div class="email">${data.email}</div>
              `
      } else {
        tipo = "Admin"
        html = ` 
      <div class="name">${data.nombre}</div>
      <div class="category">${tipo}</div>
      <div class="email">${data.email}</div>
          `
      }
      document.querySelector("#account-details").innerHTML = html
    })
    .catch(error => console.log('error', error));

}


// SET COMMENTS
const formComment = document.querySelector("#comment-form");
const comment = document.querySelector("#comment");

document.addEventListener("submit", setComment);

function setComment(event) {
  token = localStorage.getItem("token");
  console.log("entra a evento");
  event.preventDefault();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  var raw = JSON.stringify({
    "comment": comment.value
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`http://192.168.100.14:3001/api/comments/${movieId}`, requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result);
                  location.href = `movie_info.html?id=${movieId}`})
    .catch(error => console.log('error', error));
}

// CARGAR COMENTARIOS
document.addEventListener("DOMContentLoaded", cargarComentarios);

function cargarComentarios() {
  token = localStorage.getItem("token");
  console.log("Aqui estamos dentro")
  console.log(token);

  if (!token) {
    location.href = "login.html";
  }

  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  console.log(movieId.toString())

  fetch(`http://192.168.100.14:3001/api/comments/${movieId}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let card, comentarios

      // cargando card.
      console.log("dentro de card")
      card = `
      <div class="card-movie-info">
      <div class="movie-card">
        <img src="${data.movie.poster}" alt="" class="card-img" />
        <div class="movie-info">
          <h1 class="movie-title">${data.movie.title}</h1>
          <div class="info-details">
            <div class="info-item">
              <img src="./imgs/year.png" alt="" class="info-label">
              <p class="info-value">${data.movie.year}</p>
            </div>
            <div class="info-item">
              <img src="./imgs/rating.png" alt="" class="info-label">
              <p class="info-value">6/10</p>
            </div>
            <div class="info-item">
              <img src="./imgs/genre.png" alt="" class="info-label">
              <p class="info-value">${data.movie.genres}</p>
            </div>
          </div>
    
          <!-- Contenedor para el Iframe -->
          <div class="info-item">
            <a href="#" class="btnIframe" id="watch-trailer-btn">Watch Trailer</a>
            <div class="video-container" id="video-container">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/t433PEQGErc"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            </div>
          </div>
        </div>
        <div class="overview">
          <h4 class="overview-title">Overview</h4>
          <p class="overview-description">${data.movie.fullplot}</p>
        </div>
      </div>
    </div>    
      `
      document.querySelector("#contenedor_pelicula").innerHTML = card

      comentarios = '';
      // cargando comentarios
      data.allcomments.forEach((item) => {
        comentarios += ` 
          <div class="container">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                  <p class="text-secondary text-center">${new Date(item.createdAt).toLocaleString()}</p>
                </div>
                <div class="col-md-10">
                  <p>
                    <a class="float-left" href=""><strong>${item.nombre}</strong></a>
                  </p>
                  <div class="clearfix"></div>
                  <p>${item.comment}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
              `
      });

      document.querySelector("#contenido_comments").innerHTML = comentarios
    })
    .catch(error => console.log('error', error));
}

