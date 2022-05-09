const express = require("express");
const router = express.Router();
router.post("/", (req, res) => {
    req.session.name = req.body.name
    return res.redirect("/products")
})
router.post("/logout", (req, res) => {
    res.json({ message: 'ok' })
})
module.exports = router;