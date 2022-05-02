const express = require("express");
const router = express.Router();
const { validateId, validateCreateProduct, validateUpdateProduct } = require("../middleware");

const { products } = require("../db");

router.get("/", async function (req, res) {
  const allProducts = await products.getAll();
  res.status(200).json(allProducts);
});
router.post("/", validateCreateProduct, async (req, res) => {
  const { newProduct } = req;
  const io = req.app.get("io");
  await products.insert(newProduct);
  const allProducts = await products.getAll();
  io.sockets.emit("update-products", allProducts);
  res.status(201).json({ message: "Ok" });
});

router.get("/:id", validateId, async function (req, res) {
  const { id } = req.params;
  const product = await products.getById(id);
  if (product) {
    return res.status(200).json(product);
  }
  res.status(404).json({ error: "Producto no encontrado" });
});
router.delete("/:id", validateId, async function (req, res) {
  try {
    const { id } = req.params;
    const product = await products.deleteById(id);
    return res.status(200).json({ message: "ok" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Producto no encontrado" });
  }
});


router.put("/:id", validateId, validateUpdateProduct, async (req, res) => {
  const { id } = req.params;
  const { updateProduct } = req;
  try {
    await products.updateById(id, updateProduct);
    res.status(200).json({ message: "ok" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Producto no encontrado" });
  }
});
router.get("/getPlantilla", (req, res) => {
  res.sendFile("public/plantilla/productos.hbs");
});
module.exports = router;
