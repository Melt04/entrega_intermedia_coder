
const socket = io();
const normalize = normalizr.normalize
const denormalize = normalizr.denormalize
const schema = normalizr.schema
const authorSchema = new schema.Entity('author')
const messageSchema = new schema.Entity('message', {
  author: authorSchema,
})
const messagesSchema = new schema.Entity('messages', {
  messages: [messageSchema]
})


async function renderProductTable(products) {
  const data = await fetch("http://localhost:8080/api/getPlantilla");
  const html = await data.text();
  var template = Handlebars.compile(html);
  const table = document.querySelector("#product-table");
  table.innerHTML = template({ products });
}

async function renderMessages({ messages }) {

  let allMessages = "";
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
  const denormalizedData = denormalize(data.result, messagesSchema, data.entities)
  const dataSize = JSON.stringify(data).length

  const denormalizeDataSize = JSON.stringify(denormalizedData).length
  console.log(dataSize)
  console.log(denormalizeDataSize)
  const compresion = ((denormalizeDataSize - dataSize) * 100) / denormalizeDataSize
  document.querySelector("H2").innerText = `Centro de Mensajes(% de compresion ${compresion})`
  renderMessages(denormalizedData);
});
const form = document.querySelector(".message_main_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email_input").value;
  const message = document.querySelector("#message_send").value;
  const name = document.querySelector("#name_send").value;
  const age = document.querySelector("#age_send").value;
  const alias = document.querySelector("#alias_send").value;
  const lastname = document.querySelector("#lastname_send").value;
  const avatar = document.querySelector("#avatar_send").value;
  document.querySelector("#alias_send").value = "";
  document.querySelector("#email_input").value = "";
  document.querySelector("#name_send").value = "";
  document.querySelector("#lastname_send").value = "";
  document.querySelector("#age_send").value = "";
  document.querySelector("#avatar_send").value = "";
  document.querySelector("#message_send").value = "";


  socket.emit("new-message", {
    author: {
      id: email, name, age, lastname, avatar, alias
    }, text: message
  });
});

