const socket = io();
function sortProducts(product) {
  product.reduce((prev, curret) => {
    1;
  }, {});
}
async function renderProductTable(products) {
  const data = await fetch("http://localhost:8080/api/getPlantilla");
  const html = await data.text();
  var template = Handlebars.compile(html);
  const table = document.querySelector("#product-table");
  console.log(table);
  console.log(products);
  table.innerHTML = template({ products });
}

socket.on("products", (products) => renderProductTable(products));
socket.on("update-products", (products) => renderProductTable(products));
