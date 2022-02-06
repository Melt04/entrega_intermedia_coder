const socket = io();

async function renderProductTable(products) {
  const data = await fetch("http://localhost:8080/api/getPlantilla");
  const html = await data.text();
  var template = Handlebars.compile(html);
  const table = document.querySelector("#product-table");
  table.innerHTML = template({ products });
}

async function renderMessages(messages) {
  let allMessages = "";
  /*  messages = JSON.parse(messages); */
  const data = await fetch("http://localhost:8080/plantilla/mensajes.hbs");
  const html = await data.text();
  const template = Handlebars.compile(html);
  messages.forEach((message) => {
    allMessages = allMessages.concat(template({ message }));
  });
  const messageDiv = document.querySelector("#message");
  messageDiv.innerHTML = allMessages;
}
socket.on("products", (products) => renderProductTable(products));
socket.on("update-products", (products) => renderProductTable(products));
socket.on("messages", (data) => {
  renderMessages(data);
});
const form = document.querySelector(".message_main_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.querySelector("#email_input").value;
  const mensaje = document.querySelector("#message_send").value;

  socket.emit("new-message", { mensaje, user });
});
