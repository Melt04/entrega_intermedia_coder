const knex = require("knex");
class Contenedor {
  constructor(table, options) {
    this.table = table;
    this.db = knex(options);
    this.#createTable();
  }
  async #createTable() {
    try {
      const exist = await this.db.schema.hasTable(this.table);
      if (!exist) {
        await this.db.schema.createTable(this.table, (t) => {
          t.increments("id"), t.string("nombre"), t.string("modelo");
        });
      }
    } catch (e) {
      console.log("aca");
      console.log(e.message);
    }
  }

  async getAll() {
    try {
      const row = await this.db(this.table).select("*");
      return row;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async insert(cars) {
    try {
      const insertedCars = await this.db(this.table).insert(cars);
      return insertedCars;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getById(id) {
    try {
      const car = await this.db(this.table).select("*").where("id", "=", id);
      return car;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async deleteById(id) {
    try {
      const deletedCar = await this.db(this.table).where("id", "=", id).del();
      return deletedCar;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async deleteAll() {
    try {
      const deleteTable = await this.db(this.table).del();
      return deleteTable;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
module.exports = Contenedor;
