let token

document.addEventListener("DOMContentLoaded",cargarDatosUsuario)


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
            <h3>${data.nombre}</h3>
            `
  
          document.querySelector("#username").innerHTML=html
        })
        .catch(error => console.log('error', error));
  }