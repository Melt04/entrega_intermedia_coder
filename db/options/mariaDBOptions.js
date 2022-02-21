const mariaDBOptions = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    database: "ecommerce",
  },
  pool: { min: 0, max: 7 },
};

module.exports = mariaDBOptions;
