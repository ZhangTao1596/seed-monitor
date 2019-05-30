const log4js = require('log4js');

log4js.configure({
    appenders: { 
        console: { 
            type: 'stdout', 
        },
        file: {
            type: 'file',
            filename: 'neo-warn.log'
        }
    },
    categories: { default: { appenders: ['console', 'file'], level: 'info' } }
});
var logger = log4js.getLogger('neo-warn');
logger.level = 'info';
exports.logger = logger;