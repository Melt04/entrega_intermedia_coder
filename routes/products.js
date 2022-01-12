const express = require("express");
const router = express.Router();
const PRODUCTS = [{ id: 1, title: "pepe", thumbnail: "1", price: "2" }];
const { getLastId } = require("../helper");
const { validateId, validateCreateProduct, validateUpdateProduct } = require("../middleware");

router.get("/", function (req, res) {
  res.status(200).json(PRODUCTS);
});
router.post("/", validateCreateProduct, (req, res) => {
  const { newProduct } = req;
  const lastId = getLastId(PRODUCTS) + 1;
  const product = { id: lastId, ...newProduct };
  PRODUCTS.push(product);
  res.status(201).json({ message: "Ok" });
});
router.get("/:id", validateId, function (req, res) {
  const { id } = req.params;
  const product = PRODUCTS.find((product) => product.id === parseInt(id));
  if (product) {
    return res.status(200).json(product);
  }
  res.status(404).json({ error: "Producto no encontrado" });
});
router.delete("/:id", validateId, function (req, res) {
  const { id } = req.params;
  const index = PRODUCTS.findIndex((product) => product.id === parseInt(id));
  if (index > -1) {
    PRODUCTS.splice(index, 1);
    return res.status(200).json(PRODUCTS);
  }
  res.status(404).json({ error: "Producto no encontrado" });
});
router.put("/:id", validateId, validateUpdateProduct, (req, res) => {
  const { id } = req.params;
  const { updateProduct } = req;
  console.log(updateProduct);
  const index = PRODUCTS.findIndex((product) => product.id === parseInt(id));
  if (index > -1) {
    PRODUCTS[index] = { ...PRODUCTS[index], ...updateProduct };
    return res.status(200).json({ message: "Actualizado exitosamente" });
  }
  res.status(404).json({ error: "Producto no encontrado" });
});
module.exports = router;
