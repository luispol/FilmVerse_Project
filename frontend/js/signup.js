// COMUNICACION CON API - MICROTRANSACCIONES
// CODIGO GENERADO POR POSTMAN

const formSignup = document.querySelector("#signupForm");
const username = document.querySelector("#username")
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// evento para form
formSignup.addEventListener("submit", signup);

function signup(event) {
  console.log("Entra al signup event")
  event.preventDefault();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "nombre": username.value,
    "password": password.value,
    "email": email.value
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://192.168.100.14:3001/api/usuarios/", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        location.href = 'login.html'
    })
    .catch(error => console.log('error', error));
};