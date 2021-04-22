//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data.server;

            let productsNameHTML = document.getElementById("productsName");
            let productsDescriptionHTML = document.getElementById("productsDescription");
            let productsCountHTML = document.getElementById("productsCount");
            let productsCostHTML = document.getElementById("productsCost");


            productsNameHTML.innerHTML = products.name;
            productsDescriptionHTML.innerHTML = products.description;
            productsCountHTML.innerHTML = products.soldCount;
            productsCostHTML.innerHTML = products.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(products.images);
        }
    });
    //FUNCION QUE EJECUTA UN ARRAY DE IMAGENES EN JSON
    function showImagesGallery(array) {

        let htmlContentToAppend = "";

        for (let i = 0; i < array.length; i++) {
            let imageSrc = array[i];

            htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail "src=" `+ imageSrc + ` "alt="">
            </div>
        </div>
        `

            document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
        }
    }
//Obtiene los productos relacionados
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            products_related = resultObj.data.server;

            relateImages(products_related);
        }
    });
    
    //Funcion que muestra los productos relacionados
    function relateImages(array) {
        let aux = products.relatedProducts;
        let htmlContentToAppend = "";

        for (let i = 0; i < aux.length; i++) {
            htmlContentToAppend +=
                `<div style="width: 20rem; border: grey 1px solid;">
                <img class="card-img-top" style="border-bottom: grey 1px solid;" src=" ` + array[aux[i]].imgSrc + `" alt="Card image cap"></img>
                <div class="card-body">
                <p class="card-text">`+ array[aux[i]].name + `</p>
                <p class="card-text">`+ array[aux[i]].description + `</p>
                <p class="card-text"><b>USD</b> `+ array[aux[i]].cost + `</p>
                </div>
                </div>`
            document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
        }
    }

    //FUNCION QUE ME TRAE UN ARRAY DE LOS COMENTARIOS GUARDADOS
    var products_comments = [];
    function showComments(array) {

        let htmlContentToAppend = "";

        for (let i = 0; i < array.length; i++) {
            let products_comments = array[i];

            htmlContentToAppend +=
                `<div class="container">
                 <small><b>Usuario: `+ products_comments.user + ` ` + products_comments.dateTime
                + ' <span class="fa fa-star checked"></span> '.repeat(products_comments.score)
                + products_comments.score + `</small></b>
                 </div>
     
                 <div>
                 <p class="row"> `+ products_comments.description + `</p> 
                 </div>
                 <hr> 
                 </div>`
            document.getElementById("productsInfoComments").innerHTML = htmlContentToAppend;


        }
    }
    //FUNCION QUE EJECUTA LOS COMENTARIOS GUARDADOS EN EL JSON
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            products_comments = resultObj.data.server;

            showComments(products_comments);
        }

    });


    //Guardado en caja de comentarios
    $("#comment_form").on('submit', (event) => {
        event.preventDefault();
        let new_comment = {};

        //Funcion JQuery para los datos ingresados(StackOverFlow)
        $.each($('#comment_form').serializeArray(), function (i, field) {
            new_comment[field.name] = field.value;
        });

        new_comment['dateTime'] = new Date();
        new_comment['user'] = localStorage.getItem('inputEmail');

        products_comments.push(new_comment);

        localStorage.setItem('productsComments', JSON.stringify(products_comments));

        showComments(products_comments);


        $('#comment_form').trigger("reset");
    });
});
