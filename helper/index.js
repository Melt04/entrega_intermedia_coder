const bCrypt = require('bcrypt')
getLastId = product => {
  return product[product.length - 1].id
}

getMaxId = array => {
  const maxId = array.length > 0 ? array[array.length - 1].id + 1 : 0
  return maxId
}
function isValidPassword (user, password) {
  return bCrypt.compareSync(password, user.password)
}

function createHash (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

module.exports = { getLastId, getMaxId, isValidPassword, createHash }
