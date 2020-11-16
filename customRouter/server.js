const http = require('http');

const paramsRegexp = /:[^/]+/g;
const getRouteRegexp = (route) => new RegExp(`^${route}$`.replace(paramsRegexp, '([^/]+)'));
const getRouteParams = (mathcedRoute, path) => {
  const paramNames = (mathcedRoute.match(paramsRegexp) || []).map((item) => item.substring(1));
  return paramNames
    ? path
        .match(getRouteRegexp(mathcedRoute))
        .slice(1)
        .reduce((res, val, i) => {
          return Object.assign(res, { [paramNames[i]]: val });
        }, {})
    : {};
};

class Server {
  #server = null;
  #map = {
    get: new Map(),
    post: new Map(),
    put: new Map(),
    delete: new Map(),
    patch: new Map(),
  };

  constructor(transport) {
    this.#server = transport.createServer(this.#handleRequests);
    this.#setupRouteHandlers();

    return this;
  }

  listen(...args) {
    this.#server.listen(...args);
  }

  #setupRouteHandlers = () => {
    Object.keys(this.#map).forEach((method) => {
      this[method] = (path, controller) => {
        this.#map[method].set(path, controller);
      };
    });
  };

  #handleRequests = async (req, res) => {
    try {
      await this.#parseBody(req);
      const [path, queryParamsString] = req.url.split('?');
      const matchedRoutes = this.#map[req.method.toLowerCase()];
      const matchedRoute = Array.from(matchedRoutes.keys()).find((route) => {
        return getRouteRegexp(route).test(path);
      });
      const routeParams = getRouteParams(matchedRoute, path);
      const controller = matchedRoutes.get(matchedRoute);

      Object.assign(req, {
        queryParams: new URLSearchParams(queryParamsString),
        routeParams,
      });

      if (controller) {
        controller(req, res);
      }
    } catch (error) {}
  };

  #parseBody = async (req) => {
    let bodyData = Buffer.from([]);
    return new Promise((resolve) => {
      req.on('data', (chunk) => {
        bodyData = Buffer.concat([bodyData, chunk]);
      });
      req.on('end', () => {
        try {
          req.body = JSON.parse(bodyData.toString());
          resolve();
        } catch (error) {
          resolve();
        }
      });
    });
  };
}

module.exports = () => new Server(http);
