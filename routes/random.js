const express = require('express')
const { fork } = require('child_process')
const router = express.Router()
router.get('/', (req, res) => {
  const { query } = req
  cant = query?.cant ? query.cant : 100000000
  const forked = fork('./helper/randomCalculator')
  forked.send(cant)
  forked.on('message', numbers => {
    res.send(numbers)
  })
})

module.exports = router
