// variables
let token;
// al cargar la pagina se cargara nombre del usuario y se podra utilizar en cualquier lugar.
let nombre;

// Eventos
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

  var raw = JSON.stringify({
    "comment": comment.value,
    "nombreUsuario": nombre
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://192.168.100.14:3001/api/comments/", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      location.href = 'movie_info.html'
    })
    .catch(error => console.log('error', error));
}

// SHOW ALL COMMENTS
document.addEventListener("DOMContentLoaded", cargarCard);

function cargarCard() {
  token = localStorage.getItem("token");
  console.log("Aqui estamos dentro")
  console.log(token);

  if (!token) {
    location.href = "login.html";
  }

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://192.168.100.14:3001/api/comments/", requestOptions)
    .then(response => response.json())
    .then(data => {
      let html
      data.forEach((item) => {
        html += ` 
                <div class="card">
                <div class="card-body">
                    <div class="row">
                      <div class="col-md-2">
                        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid" />
                        <p class="text-secondary text-center">${item.createdAt}</p>
                      </div>
                      <div class="col-md-10">
                        <p>
                          <a class="float-left"
                            href=""><strong>${item.nombre}</strong></a>
        
                        </p>
                        <div class="clearfix"></div>
                        <p>${item.comment}</p>
                        <p>
                          <a class="float-right btn btn-outline-primary ml-2"></i> edit</a>
                          <a class="float-right btn text-white btn-danger"></i> Delete</a>
                        </p>
                      </div>
                    </div>
                </div>
                </div>
                `
      });

      document.querySelector("#contenido_comments").innerHTML = html
    })
    .catch(error => console.log('error', error));
}


// GET USER
document.addEventListener("DOMContentLoaded", cargarUser)

function cargarUser() {
  console.log("estamos cargando usuario")
  console.log(token);

  var myHeaders = new Headers();
  myHeaders.append("Authorization",  `Bearer ${token}`);

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
    if(data.tipo.toString() === "2"){
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


