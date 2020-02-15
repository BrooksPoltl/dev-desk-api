// Update with your config settings.

require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_DEV,
      user: process.env.USERNAME_DEV,
      password: process.env.PASSWORD_DEV,
      port: 5432,
      host: process.env.HOST_DEV,
      ssl: true
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: 5432,
      ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    ssl: true
  }
};
