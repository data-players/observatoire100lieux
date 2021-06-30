const { WebIdService } = require('@semapps/webid');

module.exports = {
    mixins: [WebIdService],
    settings: {
        usersContainer: 'http://localhost:3000/users/'
    }
};
