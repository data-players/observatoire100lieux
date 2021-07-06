const path = require('path');
const { JsonLdService } = require('@semapps/jsonld');
const CONFIG = require('../config');

module.exports = {
  mixins: [JsonLdService],
  settings: {
    baseUri: CONFIG.SEMAPPS_SPARQL_ENDPOINT,
    localContextFiles: [
      {
        path: '/context.json',
        file: path.resolve(__dirname, '../public/context.json')
      }
    ]
  }
};
