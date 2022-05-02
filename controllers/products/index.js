const { faker } = require('@faker-js/faker');


const generateRandomProduct = (id) => {
    const randomProduct = {
        id,
        product: faker.commerce.product(),
        price: faker.commerce.price(),
        material: faker.commerce.productMaterial(),
        department: faker.commerce.department()

    }

    return randomProduct



}
module.exports = generateRandomProduct