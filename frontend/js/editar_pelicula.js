

//Variables
const formNuevaPelicula = document.querySelector("#formNuevaPelicula")

let idPelicula


//Eventos
document.addEventListener("DOMContentLoaded",cargarDatos)
formNuevaPelicula.addEventListener("submit",guardar)

//Funciones
function cargarDatos(){


    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      idPelicula = localStorage.getItem("id")
      if (!idPelicula){
        alert("No ha seleccionado una pelicula")
        location.href="admin_view.js"
      }
      fetch(`http://192.168.0.170:3001/api/movies/card?id=${idPelicula}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            document.querySelector("#title").value = data[0].title
            document.querySelector("#genres").value = data[0].genres
            document.querySelector("#directors").value = data[0].directors
            document.querySelector("#fullplot").value = data[0].fullplot
            document.querySelector("#year").value = data[0].year
            document.querySelector("#released").value = data[0].released
            document.querySelector("#countries").value = data[0].countries
            document.querySelector("#poster").value = data[0].poster
            document.querySelector("#rating").value = data[0].rating
            document.querySelector("#trailer").value = data[0].trailer

        })
        .catch(error => console.log('error', error));

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
    "rating": document.querySelector("#rating").value,
    "trailer": document.querySelector("#trailer").value
    });

    const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`http://192.168.0.170:3001/api/movies/card?id=${idPelicula}`, requestOptions)
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