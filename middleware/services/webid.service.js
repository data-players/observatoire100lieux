const CONFIG = require("../config");
const { WebIdService } = require('@semapps/webid');

module.exports = {
    mixins: [WebIdService],
    settings: {
        usersContainer: CONFIG.SEMAPPS_HOME_URL+'users/'
    }
};
