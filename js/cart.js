//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.`ç
var subtotal = 0;
var cantidad = 0;
var costoenvio = 0;

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            array = resultObj.data.server.articles;

            articulos = array;
            listarCarrito();
        }
    });

    document.getElementById("porcentaje").addEventListener("input", function (e) {

        actualizarcostoenvio();
    })
})
 
let articulos = [];
function listarCarrito() {
    subtotal = 0;
    cantidad = 0;
    let htmlContentToAppend = "";
    for (let i = 0; i < articulos.length; i++) {
        let articulo = array[i]
        
        if (articulo.currency == "USD") {
            subtotal += articulo.count * articulo.unitCost * 40;
        }
        else {
            subtotal += articulo.count * articulo.unitCost;
        }

        cantidad += articulo.count;
        htmlContentToAppend += `
            <div class="card">
                <img src="` + articulo.src + `" class="card-img-top" alt="" style="width: 200px; height: 150px;">
                    <div class="card-body">
                        <h4 class="card-title"><b>` + articulo.name + `</b></h4>
                        <p class="card=text">
                        <span class="cart-unit-text">
                          Precio por Unidad: ${articulo.unitCost} ${articulo.currency}
                        </span>
                        <div class="product-info-form">
                            <div class="side">
                              <label for="count">Cantidad</label>     
                              <div class="quantity">
                                  <button class="btn minus1" onclick="cambiarValor(${i}, ${articulo.count - 1})">-</button>
                                  <input class="quantity" min="0" onchange="cambiarValor(${i}, this.value)"  value="${articulo.count}" type="number">
                                  <button class="btn add1" onclick="cambiarValor(${i}, ${articulo.count + 1})">+</button>
                              </div>               
                            </div>
                            <div class="side" style="margin-left: 12px;">
                              <label for="count">Costo</label>
                              <div class="total-count-price">${articulo.count * articulo.unitCost} ${articulo.currency}</div>
                            </div>
                        </div>
                        </p>
                        
                        <button type="button" onclick="quitarArticulo(${i});" class="btn btn-danger btn-discard">Quitar</button>
                    </div>
            </div>`

    }
    document.getElementById("Carrito").innerHTML = htmlContentToAppend;
    document.getElementById("cantidad").innerHTML = cantidad;
    document.getElementById("subtotal").innerHTML = subtotal;

    actualizarcostoenvio();
}


function cambiarValor(i, valor) {
    const number = parseInt(valor);
    if (number >= 0) {
        articulos[i].count = parseInt(valor);
        listarCarrito();
    }
}

function quitarArticulo(i) {
    articulos.splice(i, 1);
    listarCarrito();
}

function actualizarcostoenvio() {
    let porcentaje = document.getElementById("porcentaje").value;
    costoenvio = subtotal * porcentaje / 100;
    let total = subtotal + costoenvio;
  
    document.getElementById("costoenvio").innerHTML = costoenvio;
    document.getElementById("totalcompra").innerHTML = total;
  
  }

