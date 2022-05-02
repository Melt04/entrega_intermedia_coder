getLastId = (product) => {
  return product[product.length - 1].id;
};

getMaxId = (array) => {

  const maxId = array.length > 0 ? array[array.length - 1].id + 1 : 0;
  return maxId;
};
module.exports = { getLastId, getMaxId };
