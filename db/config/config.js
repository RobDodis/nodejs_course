const appConfig = require('../../config');

module.exports = {
  development: {
    username: appConfig.DB_USER,
    password: appConfig.DB_PASSWORD,
    database: appConfig.DB_NAME,
    host: appConfig.DB_HOST,
    port: appConfig.DB_PORT,
    dialect: 'postgres',
    define: {
      timestamp: true,
    },
  },
  test: {
    username: appConfig.DB_USER,
    password: appConfig.DB_PASSWORD,
    database: appConfig.DB_NAME,
    host: appConfig.DB_HOST,
    port: appConfig.DB_PORT,
    dialect: 'postgres',
    define: {
      timestamp: true,
    },
  },
  production: {
    username: appConfig.DB_USER,
    password: appConfig.DB_PASSWORD,
    database: appConfig.DB_NAME,
    host: appConfig.DB_HOST,
    port: appConfig.DB_PORT,
    dialect: 'postgres',
    define: {
      timestamp: true,
    },
  },
};
