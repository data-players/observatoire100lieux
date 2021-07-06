const { InferenceService } = require('@semapps/inference');
const ontologies = require('../ontologies');
const CONFIG = require("../config");

module.exports = {
    mixins: [InferenceService],
    settings: {
        baseUrl: CONFIG.SEMAPPS_HOME_URL,
        ontologies : ontologies
    }
};
