// variables
let token;

// Eventos

document.addEventListener("DOMContentLoaded", cargarDatos);

function cargarDatos() {
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
                            href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>Maniruzzaman
                              Akash</strong></a>
        
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

