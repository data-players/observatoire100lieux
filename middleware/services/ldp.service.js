const { LdpService } = require('@semapps/ldp');
const urlJoin = require('url-join');
const ontologies = require('../ontologies.json');
const CONFIG = require('../config');
const containers = require('../containers');

module.exports = {
  mixins: [LdpService],
  settings: {
    baseUrl: CONFIG.SEMAPPS_HOME_URL,
    ontologies,
    containers,
    defaultContainerOptions: {
      jsonContext: urlJoin(CONFIG.SEMAPPS_HOME_URL, 'context.json')
    }
  }
};
