class Contenedor {
  constructor(table, db) {
    this.table = table;
    this.db = db;
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

  async insert(data) {
    try {
      const insertedData = await this.db(this.table).insert(data);
      return insertedData;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getById(id) {
    try {
      const insertedData = await this.db(this.table).select("*").where("id", "=", id);
      return insertedData;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async deleteById(id) {
    try {
      const deletedData = await this.db(this.table).where("id", "=", id).del();
      return deletedData;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async updateById(id, data) {
    try {
      const deletedData = await this.db(this.table).where("id", "=", id).update(data);
      return deletedData;
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
