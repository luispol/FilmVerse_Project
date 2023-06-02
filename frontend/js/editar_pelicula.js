//Variables
const formNuevaPelicula = document.querySelector("#formNuevaPelicula")
let token
// IP CONEXION PARA FECTH
const IP = "192.168.100.14"


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
    var raw = "";

    var requestOptions = {
    method: 'PUT',
    body: raw,
    redirect: 'follow'
    };

    fetch("localhost:3001/api/movies/card?id=6476f5eed04367b90ee7f007", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}