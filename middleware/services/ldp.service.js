const { LdpService } = require('@semapps/ldp');
const ontologies = require('../ontologies');
const containers = require('../containers');
const urlJoin = require('url-join');
const CONFIG = require('../config');

module.exports = {
  mixins: [LdpService],
  settings: {
    baseUrl: CONFIG.SEMAPPS_HOME_URL,
    ontologies,
    containers,
    defaultContainerOptions: {
      jsonContext:  'localhost:3000/context.json'
    }
  },
};
