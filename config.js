require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const DEFAULT_CONFIG = {
  development: {
    NODE_ENV,
    PORT: process.env.PORT || 3000,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: process.env.DB_PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  },
  test: {
    NODE_ENV,
    PORT: process.env.PORT || 3000,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: process.env.DB_PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  },
  production: {
    NODE_ENV,
    PORT: process.env.PORT || 3000,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: process.env.DB_PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  },
};

const arguments = process.argv.slice(2);
const config = arguments.reduce((acc, argument) => {
  const matched = argument.match(/^-(?<name>\w+)=(?<value>\w+)$/);
  if (matched) acc[matched.groups.name] = matched.groups.value;
  return acc;
}, {});

Object.assign(module.exports, DEFAULT_CONFIG[NODE_ENV], config);
