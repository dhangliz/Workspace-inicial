function mensajeError(id,idmen) {
    var campos = document.getElementById(id);
    var error = document.getElementById(idmen);
    if(campos.value == ''){
        if(error.id == 'errorNombre'){
            error.innerHTML = "Se requiere Usuario.";
        }else{
            error.innerHTML = "Se requiere Contraseña.";
        }
        error.style.display = "block";
        campos.classList.add("error");
    }else{
        error.style.display = "none";
        campos.classList.remove("error");
    }
}
function redireccion(){ 
    var nombre = document.getElementById('nombre');
    var contra = document.getElementById('password');
    if(nombre.value !== '' && contra.value !== ''){ //si el valor de nombre y de contra es vacio
        sessionStorage.setItem('veamos',true); //almacena un valor para usar una vez al inicio
        sessionStorage.setItem('Alex',nombre.value);
        location.replace("index.html"); //si esta esta listo redirecciona
    }
}

document.addEventListener("DOMContentLoaded", function(e){
});
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.