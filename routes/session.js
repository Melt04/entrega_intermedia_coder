const express = require('express')
const router = express.Router()
router.post('/', (req, res) => {
  return res.redirect('/products')
})
router.post('/logout', (req, res) => {
  const { name } = req.session
  console.log(name)
  req.session.destroy(err => {
    if (err) {
      throw new Error(err)
    }
    console.log('destroy')
    return res.render('logout', { user: name })
  })
})
module.exports = router
