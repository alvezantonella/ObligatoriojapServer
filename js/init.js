//const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
//const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
//const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
//const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
//const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
//const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
//const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
//const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
//const CART_PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

const CATEGORIES_URL = "http://localhost:5500/categories";
const PUBLISH_PRODUCT_URL = "http://localhost:5500/publish_product";
const CATEGORY_INFO_URL = "http://localhost:5500/category_info";
const PRODUCTS_URL = "http://localhost:5500/products";
const PRODUCT_INFO_URL = "http://localhost:5500/product_info";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:5500/product_info_comments";
const CART_INFO_URL = "http://localhost:5500/cart_info";
const CART_BUY_URL = "http://localhost:5500/cart_buy";
const CART_PRODUCTS_URL = "http://localhost:5500/cart_products";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Funci??n que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const userElement = document.getElementsByClassName('username')[0];

  if (user == null && userElement !== undefined) {
    window.location.href = "login.html"
  }
  else if (userElement !== undefined) { userElement.innerText = user.email; }

});

//Elimina registro de usuario logueado
function logoutUser() {
  localStorage.clear();
}
