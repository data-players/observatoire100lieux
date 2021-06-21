const ApiGatewayService = require('moleculer-web');
const { Routes: SparqlEndpointRoutes } = require('@semapps/sparql-endpoint');
const { CasConnector, OidcConnector } = require('@semapps/auth');
const path = require('path');
const CONFIG = require('../config');

module.exports = {
  mixins: [ApiGatewayService],
  settings: {
    server: true,
    routes: [
      {
        path: new URL(CONFIG.SEMAPPS_HOME_URL).pathname +'context.json',
        use: [
          ApiGatewayService.serveStatic('./public/context.json', {
            setHeaders: res => {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Content-Type', 'application/ld+json; charset=utf-8');
            }
          })
        ]
      }
    ],
    cors: {
      origin: '*',
      exposedHeaders: '*'
    }
  },
  dependencies: [
    'ldp',
    'sparqlEndpoint',
    'auth',
  ],
  async started() {
    [
      ...(await this.broker.call('ldp.getApiRoutes')),
      ...(await this.broker.call('sparqlEndpoint.getApiRoutes')),
      ...(await this.broker.call('auth.getApiRoutes')),
    ].forEach(route => this.addRoute(route));
  },
  methods: {
    authenticate(ctx, route, req, res) {
      return this.connector.authenticate(ctx, route, req, res);
    },
    authorize(ctx, route, req, res) {
      return this.connector.authorize(ctx, route, req, res);
    }
  }
};
