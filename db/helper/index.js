createTableProducts = async (db) => {
  try {
    const exist = await db.schema.hasTable("productos");
    if (!exist) {
      await db.schema.createTable("productos", (t) => {
        t.increments("id"), t.string("title"), t.string("thumbnail"), t.float("price");
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

createTableMessage = async (db) => {
  try {
    const exist = await db.schema.hasTable("mensajes");
    if (!exist) {
      await db.schema.createTable("mensajes", (t) => {
        t.increments("id"), t.string("mensaje"), t.string("user"), t.timestamp("date").defaultTo(db.fn.now());
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { createTableMessage, createTableProducts };
