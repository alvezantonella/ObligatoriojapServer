//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    const loginForm = document.getElementById('loginForm');

    loginForm.onsubmit = (e) => {

        e.preventDefault();
        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;

        const usuario = {
          email,
          password,
          firstName: '',
          lastName: '',
          age: '',
          phone: '',
          mobile: '',
          location: '',
        };

        localStorage.setItem('user', JSON.stringify(usuario));
        window.location.href = "index.html";
    }
});
