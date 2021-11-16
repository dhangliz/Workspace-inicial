var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

    


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            

            let productName  = document.getElementById("productName");
            let productDescription = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("soldCount");
            let productCost = document.getElementById("precio");
            let productCategories = document.getElementById("auto");
        
            productName.innerHTML = product.name;
            productDescription.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCost.innerHTML = product.cost + product.currency;
            productCategories.innerHTML = product.category;

            showImagesGallery(product.images);

        }
    });
});




var comentarios = [];
function showComments(array){
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++){
        let coment = array[i];

        htmlContentToAppend += ` 
        <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
        <!-- Card-->
        <div class="card rounded shadow-sm border-0">
            <div class="card-body p-4">
                <h5> <a href="#" class="text-dark">`+ coment.user +`</a></h5>
                <p class="small text-muted font-italic">`+ coment.description +`</p>
                <p class="small text-muted font-italic">`+ coment.dateTime +`</p>
                <ul class="list-inline small">`+ comparar(coment.score) +`
                </ul>
            </div>
        </div>
    </div>
        `
    }
 document.getElementById("comentarios").innerHTML += htmlContentToAppend;
};
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        { 
            comentarios = resultObj.data;
            showComments(comentarios);
        }
    });
});
function comparar(cantidad){
    var texto = ""
    if (cantidad == 5){
        texto +=`
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        `
        return texto;
    }else if(cantidad == 4){
        texto +=`
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        `
        return texto;
    }else if(cantidad == 3){
        texto +=`
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        `
        return texto;
    }else if(cantidad == 2){
        texto +=`
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        `
        return texto;
    }else if(cantidad == 1){
        texto +=`
        <li class="list-inline-item m-0"><i class="fa fa-star text-success"></i></li>
        `
        return texto;
    }
}
function puntuar(){
    var estrellas = document.getElementById("starsAccount");
    var usuario = sessionStorage.getItem("Alex");
    var comen = document.getElementById("addComent");
    var hoy = new Date()
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let htmlContentToAppend = "";
    htmlContentToAppend += ` 
    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
    <!-- Card-->
    <div class="card rounded shadow-sm border-0">
        <div class="card-body p-4">
            <h5> <a href="#" class="text-dark">`+ usuario +`</a></h5>
            <p class="small text-muted font-italic">`+ comen.value +`</p>
            <p class="small text-muted font-italic">`+ fecha + ` ` + hora +`</p>
            <ul class="list-inline small">`+ comparar(estrellas.value) +`
            </ul>
        </div>
    </div>
</div>n
    `
document.getElementById("comentarios").innerHTML += htmlContentToAppend;
}

var productsArray = []; 
let relacionados = [];

function showProducts(array){
    
    let htmlContentToAppend = "";
    for(let x = 0; x < relacionados.length; x++){
    for(let i = 0; i < array.length; i++){
        var producto = array[i];
        if( i == relacionados[x] ){
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div>
        <img class="card-img-top" src="`+ producto.imgSrc +`">
        <div>
          <h4 class="card-title">`+ producto.name +`</h4>      
        </div>
      </div>
        </a>
        `
        }
    }
}
    document.getElementById("productosRelacionados").innerHTML = htmlContentToAppend;
}
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            relacionados = product.relatedProducts;   
            showProducts(productsArray);
        }
    });
});