const sqlite3Options = {
  client: "sqlite3",
  connection: {
    filename: "./db/sqlite3/mydq.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = sqlite3Options;
