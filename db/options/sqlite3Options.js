const sqlite3Options = {
  client: "sqlite3",
  connection: {
    filename: "./db/sqlite3/ecommerce",
  },
  useNullAsDefault: true,
};

module.exports = sqlite3Options;
