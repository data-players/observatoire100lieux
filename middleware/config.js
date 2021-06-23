require('dotenv-flow').config();

module.exports = {
SEMAPPS_HOME_URL: 'http://localhost:3000/',
SEMAPPS_SPARQL_ENDPOINT: 'http://localhost:3030/',
SEMAPPS_MAIN_DATASET: '100lieux',
SEMAPPS_JENA_USER: 'admin',
SEMAPPS_JENA_PASSWORD: 'admin',

SEMAPPS_OIDC_ISSUER: 'https://login.lescommuns.org/auth/realms/master/',
SEMAPPS_OIDC_CLIENT_ID: 'semapps',
SEMAPPS_OIDC_CLIENT_SECRET: '8b90b5f1-bb15-4438-9f04-d61262705430'
}
