const { Kysely, PostgresDialect } = require("kysely");
const { Pool } = require("pg");

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }),
  }),
});

module.exports = db;
