function loadUserData() {
    // Obtener los datos del usuario de localStorage
    var email = localStorage.getItem("email");
    var name = localStorage.getItem("name");

    // Actualizar los elementos HTML con los datos del usuario
    document.querySelector(".name").textContent = name;
    document.querySelector(".email").textContent = email;
  }
  
  // Llamar a la función para cargar los datos del usuario
  loadUserData();
  