function formaDeInput(){
    var numTarjeta = document.getElementById("nTarjeta");
    var vencimiento = document.getElementById("vence");
    var codeVerificacion = document.getElementById("cVerifi");
    var NroCuenta = document.getElementById("tBanco");
    var labelnt = document.getElementById("nt");
    var labelfv = document.getElementById("fv");
    var labelcv = document.getElementById("cv");
    var labelnc = document.getElementById("nc");
    if(tarjeta.checked == true){
        numTarjeta.style.display = "block";
        vencimiento.style.display = "block";
        codeVerificacion.style.display = "block"
        labelnt.style.display = "block";
        labelfv.style.display = "block";
        labelcv.style.display = "block";
        falta2.style.display = "block"
        NroCuenta.style.display = "none";
        labelnc.style.display = "none"
        falta3.style.display = "none";

    }if(banco.checked == true){
        numTarjeta.style.display = "none";
        vencimiento.style.display = "none";
        codeVerificacion.style.display = "none"
        labelnt.style.display = "none";
        labelfv.style.display = "none";
        labelcv.style.display = "none";
        NroCuenta.style.display = "block";
        falta3.style.display = "block"
        labelnc.style.display = "block";
        falta2.style.display = "none";
    }
}
function verificarMPago(){
    var numTarjeta = document.getElementById("nTarjeta");
    var vencimiento = document.getElementById("vence");
    var codeVerificacion = document.getElementById("cVerifi");
    var NroCuenta = document.getElementById("tBanco");
    var falta2 = document.getElementById("falta2");
    var falta3 = document.getElementById("falta3");
    if (tarjeta.checked == true){
        if(numTarjeta.value == "" || vencimiento.value == "" || codeVerificacion.value == ""){    
            falta2.innerHTML = "Hay campos vacios";
            falta2.style.color = "red"
        }else{
            falta2.style.display = "none"
        }
        }if (banco.checked == true){
            if(NroCuenta.value == ""){
                falta3.innerHTML = "Hay campos vacios";
                falta3.style.color = "red"
        }else{
            falta3.style.display = "none"
        }
    }
}

function validar() {
    var calle = document.getElementById("calle");
    var numero = document.getElementById("numero");
    var esquina = document.getElementById("esquina");
    var errando = document.getElementById("elerroh");
    if (calle.value == "" || numero.value == "" || esquina.value == "" ) {
        errando.style.display = ""
        errando.innerHTML = "Hay un campo vacio.";
        errando.style.color = "red";
    }else{
        errando.style.display = "none"
    }
};
function validar2(){
    var imput = document.getElementById("1");
    var falta = document.getElementById("falta")
    if (imput.value == "") {
        falta.style.display = ""
        falta.innerHTML = "Especifique cantidad!";
        falta.style.color = "red"
    }else{
        falta.style.display = "none"
    }
};
function pago(){
    var dato = document.getElementById("1"); //id del input
    let envio = document.getElementsByName("envio"); //id del 
    var elementoP = document.getElementById("2");
    for(i = 0; i < envio.length; i++){
        if(envio[i].checked){
            var valor = envio[i].value;
            let resultado = (pepito * dato.value * valor).toFixed(2);
            elementoP.innerHTML = "SubTotal: " + resultado;
        };
    };
};
let pepito = 0;


function procederPago(){
    var tarjeta = document.getElementById("tarjeta"); 
    var banco = document.getElementById("banco");
    var premium = document.getElementById("Premium"); 
    var expres = document.getElementById("Express");
    var standard = document.getElementById("Standard");
    var calle = document.getElementById("calle"); 
    var numero = document.getElementById("numero");
    var esquina = document.getElementById("esquina");
    var dato = document.getElementById("1");
    if((calle.value !== "" && esquina.value !== "" && numero.value !== "" && dato.value !== "")&&(premium.checked == true || expres.cheched == true || standard.checked == true)&&(tarjeta.checked == true || banco.checked == true)){
        alert("Gracias por su compra");
    }else{
        alert("Falta algo")
    }
};
var articulos = [];

function mostrarArticulo(){
    let mostrando = "";
    for(i=0;i < articulos.length; i++){
        let articulo = articulos[i];
        mostrando += `
            <div class="border">
                <div class="float-left">
                    <img class="w-100" src="`+articulo.src+`">
                    <p class="text-center">`+ articulo.unitCost + articulo.currency + `</p>
                </div>
                <div class="float-right p-5">
                    <h4>` + articulo.name + `</h4>
                    <input type="text" id="1" onkeyup="subTotal();" onblur="validar2();" value=""><br>
                    <p id="falta"></p>
                    <small>` + articulo.count + " articulos" + `</small>
                </div>
            </div>
        `
        document.getElementById("contenedor").innerHTML += mostrando;
    }
};

function precioFinal(){
    let mostrando = "";
    for(i = 0; i < articulos.length; i++){
        let articulo = articulos[i];
        mostrando +=
        `
        <div>
            <div>
                <img class="w-50" src="`+ articulo.src +`">
                <h6 class="text-center">`+ articulo.unitCost + articulo.currency +`</h6>      
            </div>
            <div>
            </div>
            <p id="2"></p>
            <p id="3"></p>
            <input type="button" onclick="procederPago();" value="Proceder al pago">
        </div>
        `
        
        document.getElementById("contenedor2").innerHTML += mostrando;
    }
}
function subTotal(){
    var dato = document.getElementById("1");
    var subtotal = document.getElementById("2");
    var total =  document.getElementById("3");
    for (let i = 0;i < articulos.length; i++){
        let precio = articulos[i].unitCost;
        pepito = precio;
        var resultado = precio*dato.value;
        subtotal.innerHTML = "SubTotal : " + resultado;
        let IVA = resultado*1.22;
       total.innerHTML = "Total : " + IVA;
    }
};


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            carrito = resultObj.data;
            articulos = carrito.articles;
            mostrarArticulo();
            precioFinal();
            subTotal();
        };
    });
});