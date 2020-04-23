const moment = require('moment');

const logger = {
    info: m => console.log(`[${moment(new Date()).format('Y-MM-DD H:mm:ss')}] {INFO} ${m}`),
    warning: m => console.log(`[${moment(new Date()).format('Y-MM-DD H:mm:ss')}] {WARNING} ${m}`),
    error: m => console.log(`[${moment(new Date()).format('Y-MM-DD H:mm:ss')}] {ERROR} ${m}`),
};

module.exports = logger;