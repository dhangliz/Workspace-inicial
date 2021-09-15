const ordenarAsendente = "AZ";
const ordenarDesendente = "ZA";
const ordenarPorProducto = "Cant.";
var productsArray = []; 
var actualOrdenado = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(veamos, array){ //ordena los elementos de un array
    let result = [];
    if (veamos === ordenarAsendente ){
        result = array.sort(function(a, b){
            if ( a.cost < b.cost ){return -1;} //si el valor es por debajo de 0, a se muestra primero ordenado por el costo
            if ( a.cost > b.cost ){return 1;}
        return 0;
        });
    }else if (veamos === ordenarDesendente){ //si el valor esta por encima de 0, b se muestra primero ordenado por el costo
        result = array.sort(function(a, b){
            if (a.cost > b.cost){return -1;}
            if (a.cost < b.cost){return 1;}
            return 0;
    });
}else if (veamos === ordenarPorProducto){ //ordenado por el producto
    result = array.sort(function(a, b){
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);
        if (aCount > bCount ){ return -1;}
        if (aCount < bCount ){ return 1;}
        return 0;
    });
}
return result;
}

function showCategoriesList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){
        let category = productsArray[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    <p> ` + category.cost + category.currency + ` </p>
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                    </div>
                    <p> ` + category.description + ` </p>
                </div>
            </div>
        </div>
        </a>
        ` // le agrege el cost y el currency debajo de la imagen para que se muestre ahi mismo, y le cambie en el small el nombre que habia por soldCount

        document.getElementById("pepe").innerHTML = htmlContentToAppend; //le cambie el id por pepe para que funcione el div con el mismo id
    }
}
}
function ordenarYMostrarProductos(ordenarVeamos, categorieArray){
    actualOrdenado = ordenarVeamos;
    if(categorieArray != undefined){
        productsArray = categorieArray;
    }
    productsArray = sortCategories(actualOrdenado, productsArray);
    showCategoriesList();
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){ //le cambie el contenido de JSONData por el de products para que cargue el mismo
        if (resultObj.status === "ok"){
            ordenarYMostrarProductos(ordenarAsendente, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        ordenarYMostrarProductos(ordenarAsendente);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordenarYMostrarProductos(ordenarDesendente);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ordenarYMostrarProductos(ordenarPorProducto);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});
const buscador = document.getElementById("elBuscadoh");
const resultado = document.getElementById("cat-list-container");

const filtrar = ()=>{
    //console.log(formulario.value);
    resultado.innerHTML = '';
    const texto = buscador.value.toLowerCase();

    for (producto of productsArray){
        let nombre = producto.name.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src=" ${producto.imgSrc} " alt=" ${producto.description} " class="img-thumbnail">
                        <p class="mb-1">  ${producto.cost}${producto.currency} </p>
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1"> ${producto.name} </h4>
                            <small class="text-muted"> ${producto.soldCount}  artículos</small>
                        </div>
                        <p class="mb-1">  ${producto.description}</p>
                    </div>
                </div>
            </a>
            `
        }
    }
    if(resultado.innerHTML === ''){
        resultado.innerHTML += `
        <p>No se encontraron resultados...</p>
        `
    }
}
buscador.addEventListener('keyup', filtrar);

filtrar();