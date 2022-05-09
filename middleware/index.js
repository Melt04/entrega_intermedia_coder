const path = require('path')
const fieldsProduct = ["title", "thumbnail", "price"];
validateId = (req, res, next) => {
  const { id } = req.params;
  if (!isNaN(id)) {
    return next();
  }
  res.status(400).json({ error: "Formato id invalido" });
};

validateCreateProduct = (req, res, next) => {
  fields = Object.keys(req.body);
  if (fields.length > 3) {
    return res.status(400).json({ error: "Error en los campos del producto" });
  }
  for (let i = 0; i < 3; i++) {
    if (!fieldsProduct.includes(fields[i])) {
      return res.status(400).json({ error: "Error en los campos del producto" });
    }
  }
  const newProduct = { ...req.body };
  req.newProduct = newProduct;
  next();
};

validateUpdateProduct = (req, res, next) => {
  fields = Object.keys(req.body);
  console.log(fields);
  if (fields.length === 0 || fields.length > 3) {
    return res.status(400).json({ error: "Error en los campos del producto" });
  }
  for (let i = 0; i <= fields.length - 1; i++) {
    if (!fieldsProduct.includes(fields[i])) {
      return res.status(400).json({ error: "Error en los campos del producto" });
    }
  }
  const updateProduct = { ...req.body };
  req.updateProduct = updateProduct;
  next();
};

isAuthMiddleware = (req, res, next) => {
  if (req.session.name) {
    return next()

  }
  return res.redirect('/')
}
authPublicDirectory = (req, res, next) => {
  if (!req.originalUrl.includes("/login.html") && !req.originalUrl.includes("/main.html")) {
    return next()
  }
  if (!req.session.name) {
    console.log("no session")
    return res.sendFile("login.html", { root: "public" });
  }
  if (!req.originalUrl.includes("/main.html")) {
    console.log("2")
    return res.sendFile("main.html", { root: "public" })
  }
  return next()
}

module.exports = { validateId, validateCreateProduct, validateUpdateProduct, isAuthMiddleware, authPublicDirectory };
