const util = require('util');
const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const config = require('../config');
const cache = require('./cache');

const jwtSignAsync = util.promisify(JWT.sign);
const jwtVerifyAsync = util.promisify(JWT.verify);

// seconds
const expiresInAccessToken = 10;
const expiresInRefreshToken = 30;

const signAccessToken = async (userId, jwtgroup) => {
  try {
    const payload = {
      id: userId,
      jwg: jwtgroup,
    };
    const secret = config.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: expiresInAccessToken,
    };

    return await jwtSignAsync(payload, secret, options);
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const signRefreshToken = async (userId, jwtgroup) => {
  try {
    const payload = {
      id: userId,
      jwg: jwtgroup,
      refresh: true,
    };
    const secret = config.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: expiresInRefreshToken,
    };

    const token = await jwtSignAsync(payload, secret, options);

    return token;
  } catch (error) {
    throw createError.InternalServerError();
  }
};

const revokeToken = (token) => {
  const payload = JWT.decode(token);
  cache.set(payload.jwg, true, payload.exp * 1000 - Date.now());
};

const verifyAccessToken = async (req, res, next) => {
  if (!req.headers.authorization) return next(createError.Unauthorized());

  try {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    const payload = await jwtVerifyAsync(token, config.ACCESS_TOKEN_SECRET);
    const blacklisted = !!cache.get(payload.jwg);
    if (payload.refresh || blacklisted) {
      return next(createError.Unauthorized());
    }

    req.user = payload;
    return next();
  } catch (error) {
    const message = error.name === 'JsonWebTokenError' ? 'Unauthorized' : error.message;
    return next(createError.Unauthorized(message));
  }
};

const verifyRefreshToken = async (refreshToken) => {
  try {
    const payload = await jwtVerifyAsync(refreshToken, config.REFRESH_TOKEN_SECRET);
    const blacklisted = !!cache.get(payload.jwg);

    if (!payload.refresh || blacklisted) {
      throw createError.Unauthorized();
    }

    return payload;
  } catch (error) {
    if (error instanceof createError.Unauthorized) {
      throw error;
    } else {
      throw createError.Unauthorized(error.message);
    }
  }
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  revokeToken,
};
