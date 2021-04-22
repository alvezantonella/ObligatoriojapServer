//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function cargarUsuario() {
	// Cargar datos:
	const usuario = JSON.parse(localStorage.getItem('user'));
	const foto = localStorage.getItem('pictureUrl') || 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png';

	// Mostrar los datos en cada input.
	$('input[name="email"]').val(usuario.email);
	$('input[name="password"]').val(usuario.password);
	$('input[name="firstName"]').val(usuario.firstName);
	$('input[name="lastName"]').val(usuario.lastName);
	$('input[name="age"]').val(usuario.age);
	$('input[name="phone"]').val(usuario.phone);
	$('input[name="mobile"]').val(usuario.mobile);
	$('input[name="location"]').val(usuario.location);
	$('#imagen-preview').attr('src', foto);
}

document.addEventListener("DOMContentLoaded", function (e) {
	cargarUsuario();

	//Cargar foto:
	// https://stackoverflow.com/questions/18457340/how-to-preview-selected-image-in-input-type-file-in-popup-using-jquery
	// https://developer.mozilla.org/es/docs/Web/API/FileReader
	$('#upload-photo').on('change', (event) => {
		const imagen = event.target.files[0] || null;

		if (imagen && imagen.type === 'image/jpeg') {
			var reader = new FileReader();
		
				reader.readAsDataURL(imagen); 

			reader.onload = function (e) {

				$('#imagen-preview').attr('src', e.target.result);
				localStorage.setItem('pictureUrl', e.target.result);
			}
		}
		else {
			alert('Imagen no válida, assegurate de subir un JPEG');
		}
	});

	// Guardar datos:
	$("#registrationForm").on('submit', (event) => {
		event.preventDefault();
		let user = {};

		// Funcion JQuery para los datos ingresados(StackOverFlow)
		$.each($('#registrationForm').serializeArray(), function (i, field) {
			user[field.name] = field.value;
		});

		if (user.email === '') {
			alert('El email no puede estar vacio');
			return;
		}

		if (user.password === '') {
			alert('La contraseña puede estar vacia');
			return;
		}

		localStorage.setItem('user', JSON.stringify(user));
		cargarUsuario();
	});

});

