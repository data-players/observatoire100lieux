const { TripleStoreService } = require('@semapps/triplestore');
const CONFIG = require('../config');

module.exports = {
  mixins: [TripleStoreService],
  settings: {
    sparqlEndpoint: CONFIG.SEMAPPS_SPARQL_ENDPOINT,
    mainDataset: CONFIG.SEMAPPS_MAIN_DATASET,
    jenaUser: CONFIG.SEMAPPS_JENA_USER,
    jenaPassword: CONFIG.SEMAPPS_JENA_PASSWORD
  },
  dependencies: ['fuseki-admin']
};
