// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "postgres",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: function (connection, callback) {
        conn.query('SET timezone="GMT";', function (error) {
          callback(error, connection);
        });}
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: function (connection, callback) {
        conn.query('SET timezone="GMT";', function (error) {
          callback(error, connection);
        });}
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
