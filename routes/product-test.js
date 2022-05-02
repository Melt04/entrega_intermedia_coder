const express = require("express");
const router = express.Router();
const generateRandomProduct = require('../controllers/products/index')

router.get('/', (req, res) => {
    let products = []
    for (let i = 0; i < 5; i++) {
        products.push(generateRandomProduct(i))
    }
    res.json(products)
})

module.exports = router