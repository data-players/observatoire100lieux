const { AuthService } = require('@semapps/auth');
const path = require('path');
const CONFIG = require('../config');

module.exports = {
    mixins: [AuthService],
    settings: {
        baseUrl: CONFIG.SEMAPPS_HOME_URL,
        jwtPath: path.resolve(__dirname, '../jwt'),
        // To set if you want to use an OIDC server
        oidc: {
            issuer: CONFIG.SEMAPPS_OIDC_ISSUER,
            clientId: CONFIG.SEMAPPS_OIDC_CLIENT_ID,
            clientSecret: CONFIG.SEMAPPS_OIDC_CLIENT_SECRET,
        },
        selectProfileData: authData => ({
            email: authData.email,
            name: authData.given_name,
            familyName: authData.family_name
        })
    }
};
