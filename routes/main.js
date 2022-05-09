const express = require('express')
const router = express.Router()
const { isAuthMiddleware } = require('../middleware/index')

router.get('/login', (req, res) => {
    if (req.session.name) {
        return res.redirect('/products')
    }
    return res.render('login')
})
router.get('/products', isAuthMiddleware, (req, res) => {
    res.render('public', { user: req.session.name })
})

module.exports = router