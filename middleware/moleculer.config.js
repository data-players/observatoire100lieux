const {ServiceBroker} = require("moleculer");
const { WebAclMiddleware } = require('@semapps/webacl');
const CONFIG = require('./config');

console.log('CONFIG.SEMAPPS_REDIS_CACHE_URL',CONFIG.SEMAPPS_REDIS_CACHE_URL);

// Use the cacher only if Redis is configured
const cacher = CONFIG.SEMAPPS_REDIS_CACHE_URL
    ? {
        type: 'Redis',
        options: {
            prefix: 'action',
            ttl: 2592000, // Keep in cache for one month
            redis: CONFIG.SEMAPPS_REDIS_CACHE_URL
        }
    }
    : undefined;

module.exports = {
    // You can set all ServiceBroker configurations here
    // See https://moleculer.services/docs/0.14/configuration.html
    errorHandler(error, { ctx, event, action }) {
        if( ctx && ctx.call ) {
            const { requestID, params } = ctx;
            console.error(error);
            // ctx.call('sentry.sendError', { error, requestID, params, event, action });
        }
        throw error;
    },
   cacher
};
