//Variables
const formNuevaPelicula = document.querySelector("#formNuevaPelicula")
let token

//Eventos
document.addEventListener("DOMContentLoaded",cargarDatos)
formNuevaPelicula.addEventListener("submit",guardar)

//Funciones
function cargarDatos(){
    token = localStorage.getItem("token")
    if (!token){
        location.href="login.html"
    }
}

function guardar(event){
    event.preventDefault()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "title": document.querySelector("#title").value,
    "genres": document.querySelector("#genres").value,
    "directors": document.querySelector("#directors").value,
    "fullplot": document.querySelector("#fullplot").value,
    "year": document.querySelector("#year").value,
    "released": document.querySelector("#released").value,
    "countries": document.querySelector("#countries").value,
    "poster": document.querySelector("#poster").value,
    "tomatoes.rating": document.querySelector("#rating").value,
    "trailer": document.querySelector("#trailer").value
    });

    const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://192.168.100.14:3001/api/movies", requestOptions)
    .then(response => response.json())
    .then(data => {
        if(!data._id){
            alert(data.msg)
        }else{
            location.href="admin_view.html"
        }
    })
    .catch(error => console.log('error', error));
}