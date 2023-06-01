
// COMUNICACION CON API - MICROTRANSACCIONES
// CODIGO GENERADO POR POSTMAN

const formLogin = document.querySelector("#formLogin");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// evento para form
formLogin.addEventListener("submit", login);

function login(event) {
  console.log("Entra al login event")
  event.preventDefault();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  console.log(myHeaders)

  const raw = JSON.stringify({
    "email": email.value,
    "password": password.value
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

fetch("http://192.168.0.170:3001/api/usuarios/login", requestOptions)
    // promesas, esas se ejecutan al futuro cuando tengo el resultado.
    // respuesta a valor de json
        .then(response => response.json())
        // la imprime aqui
        .then(data => {
            if(!data.token){
                alert(data.msg)
            } else {
                localStorage.setItem("token", data.token)
                localStorage.setItem("email", data.email)
                localStorage.setItem("password", data.password)
                localStorage.setItem("tipo",data.tipo)
                if (data.tipo=="2"){
                  location.href = "user_view.html"
                }else{
                  location.href="admin_view.html"
                }
                
                
            }
        })
        .catch(error => console.log('error', error));
};