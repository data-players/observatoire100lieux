require('dotenv-flow').config();

module.exports = {
    SEMAPPS_HOME_URL:  process.env.SEMAPPS_HOME_URL,
    SEMAPPS_SPARQL_ENDPOINT: process.env.SEMAPPS_SPARQL_ENDPOINT,
    SEMAPPS_MAIN_DATASET: process.env.SEMAPPS_MAIN_DATASET,
    SEMAPPS_JENA_USER:  process.env.SEMAPPS_JENA_USER,
    SEMAPPS_JENA_PASSWORD:  process.env.SEMAPPS_JENA_PASSWORD,
    SEMAPPS_OIDC_ISSUER: process.env.SEMAPPS_OIDC_ISSUER,
    SEMAPPS_OIDC_CLIENT_ID: process.env.SEMAPPS_OIDC_CLIENT_ID,
    SEMAPPS_OIDC_CLIENT_SECRET: process.env.SEMAPPS_OIDC_CLIENT_SECRET,
    SEMAPPS_QUEUE_SERVICE_URL:  process.env.SEMAPPS_QUEUE_SERVICE_URL,
    SEMAPPS_REDIS_CACHE_URL: process.env.SEMAPPS_REDIS_CACHE_URL,
    SEMAPPS_BACKUP_FUSEKI_DATASETS_PATH: process.env.SEMAPPS_BACKUP_FUSEKI_DATASETS_PATH,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: parseInt(process.env.SMTP_PORT, 10),
    SMTP_SECURE: process.env.SMTP_SECURE === 'true',
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    FROM_EMAIL: process.env.FROM_EMAIL,
    FROM_NAME: process.env.FROM_NAME
};
