// variables
let token;


// Eventos

document.addEventListener("DOMContentLoaded", cargarDatos);


function cargarDatos(){
    token = localStorage.getItem("token");
    if(!token){
        location.href = "login.html";
    }

    

}

