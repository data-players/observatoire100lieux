const { BackupService } = require('@semapps/backup');
const path = require('path');
const CONFIG = require('../config');

module.exports = {
    name: 'backup',
    mixins: [BackupService],
    settings: {
        localServer: {
            fusekiBackupsPath: CONFIG.BACKUP_FUSEKI_DATASETS_PATH,
            otherDirsPaths: {
                uploads: path.resolve(__dirname, '../uploads')
            }
        },
        // Required only if you want to do automatic backups
        cronJob: {
            time: '0 0 4 * * *', // Every night at 4am
            timeZone: 'Europe/Paris'
        }
    }
};
