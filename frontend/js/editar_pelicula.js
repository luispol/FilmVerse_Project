//Variables
const formNuevaPelicula = document.querySelector("#formNuevaPelicula")
let idMovie

//Eventos
document.addEventListener("DOMContentLoaded",cargarDatos)
formNuevaPelicula.addEventListener("submit",guardar)

//Funciones
function cargarDatos(){
    idMovie = localStorage.getItem("id")
    if (!idMovie){
        location.href="admin_view.html"
    }
}

function guardar(event){
    event.preventDefault()

}