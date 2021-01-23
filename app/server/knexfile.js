const path = require('path');

const options = {
  client: 'postgresql',
  connection: {
    database: 'slack',
    host: 'localhost',
    port: 5432,
    user: '',
    password: '',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'src', 'db', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'src', 'db', 'seeds'),
  },
};

module.exports = {
  development: config({
    connection: {
      database: 'slack',
    },
  }),

  test: config({
    connection: {
      database: 'slack_test',
    },
  }),

  production: config({
    connection: {
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
  }),
};

function config(overrides) {
  return Object.assign({}, options, overrides);
}
