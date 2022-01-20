const FusekiAdminService = require('@semapps/fuseki-admin');
const CONFIG = require('../config');


module.exports = {
  mixins: [FusekiAdminService],
  settings: {
    url: CONFIG.SEMAPPS_SPARQL_ENDPOINT,
    user: CONFIG.SEMAPPS_JENA_USER,
    password: CONFIG.SEMAPPS_JENA_PASSWORD
  },
  async started() {
    await this.actions.createDataset({
      dataset: CONFIG.SEMAPPS_MAIN_DATASET,
      secure: false
    });
  }
};
