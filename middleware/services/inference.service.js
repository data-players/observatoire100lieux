const { InferenceService } = require('@semapps/inference');
const ontologies = require('../ontologies');

module.exports = {
    mixins: [InferenceService],
    settings: {
        baseUrl: "http://localhost:3000/",
        ontologies : ontologies
    }
};
