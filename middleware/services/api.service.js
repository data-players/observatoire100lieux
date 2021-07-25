const ApiGatewayService = require('moleculer-web');
const CONFIG = require('../config');
const {ServiceBroker} = require("moleculer");

module.exports = {
  mixins: [ApiGatewayService],
  settings: {
    server: true,
    port: 3000,
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
      exposedHeaders: '*'
    }
  },
  methods: {
    authenticate(ctx, route, req, res) {
      return ctx.call('auth.authenticate', { route, req, res });
    },
    authorize(ctx, route, req, res) {
      return ctx.call('auth.authorize', { route, req, res });
    }
  }

};

