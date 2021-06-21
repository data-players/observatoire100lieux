
const { WebAclService } = require('@semapps/webacl');

module.exports = {
    mixins: [WebAclService],
    settings: {
        baseUrl: 'http://localhost:3000/'
    }
};
