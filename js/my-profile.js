    var perfil = window.localStorage;
    const obj = {nombre:"",apellido:"",edad:"",email:"",telefono:""};
    const elDelStringi = JSON.stringify(obj);
    if (!perfil.getItem('elRegistro')){
        perfil.setItem('elRegistro', elDelStringi);
    }

    var primerForm = document.getElementById("primerForm");
    var segundoForm = document.getElementById("segundoForm");
    var nombreM = document.getElementById("nameM");
    var apellidoM = document.getElementById("subNameM");
    var edad = document.getElementById("ageM");
    var email = document.getElementById("mailM");
    var telM = document.getElementById("telM");

function guardar(){
    primerForm.style.display = 'none';
    segundoForm.style.display = 'block';


    var elModificado = JSON.parse(perfil.getItem('elRegistro'));
    
    elModificado.nombre = nombreM.value;
    elModificado.apellido = apellidoM.value;
    elModificado.edad = edad.value;
    elModificado.email = email.value;
    elModificado.telefono = telM.value;

    perfil.setItem('elRegistro', JSON.stringify(elModificado));



}
function modificar(){
    primerForm.style.display = 'block';
    segundoForm.style.display = 'none';
}
function mensajeError(id,idmen) {
    var campos = document.getElementById(id);
    var error = document.getElementById(idmen);
    if(campos.value == ''){
        if(error.id == 'errorNameM'){
            error.innerHTML = "Se requiere Nombre.";
        }
        else if(error.id == 'errorSubNameM'){
            error.innerHTML = "Se requiere Apellido.";
        }
        else if(error.id == 'errorAgeM'){
            error.innerHTML = "Se requiere Edad.";
        }
        else if(error.id == 'errorMailM'){
            error.innerHTML = "Se requiere E-mail.";
        }else if(error.id == 'errorTelM'){
            error.innerHTML = "Se requiere Telefono de contacto"
        }
        error.style.display = "block";
        campos.classList.add("error");
    }else{
        error.style.display = "none";
        campos.classList.remove("error");
    }
};
document.addEventListener("DOMContentLoaded", function (e) {
    var llamando = JSON.parse(perfil.getItem('elRegistro'));
    document.getElementById("name").innerHTML = "Nombre: " + llamando.nombre;
    document.getElementById("subName").innerHTML = "Apellido: " + llamando.apellido;
    document.getElementById("age").innerHTML = "Edad: " + llamando.edad;
    document.getElementById("mail").innerHTML = "E-mail: " + llamando.email;
    document.getElementById("tel").innerHTML = "Telefono: " + llamando.telefono;

});