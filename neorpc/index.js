const rp = require('request-promise');
const utils = require('../utils');
const logger = utils.logger;
exports.GetBlockCount = function(url) {
    var options = {
        method: 'POST',
        uri: url,
        body: {
            jsonrpc: '2.0',
            method: 'getblockcount',
            params: [],
            id: 0,
        },
        json: true,
        resolveWithFullResponse: true,
        time: true,
    }
    return rp(options).then(res => {
        let body = res.body;
        if (body.error) {
            logger.error(body.error.message);
            return null;
        }
        return [body.result, res.elapsedTime];
    })
    .catch(e => {
        logger.error(e.message);
        return null;
    })
}

exports.GetVersion = function(url) {
    var options = {
        method: 'POST',
        uri: url,
        body: {
            jsonrpc: '2.0',
            method: 'getversion',
            params: [],
            id: 0,
        },
        json: true,
    }
    return rp(options).then(res => {
        if (res.error) {
            logger.error(res.error.message);
            return null;
        }
        return res.result.useragent.replace(/\//gi, "");
    })
    .catch(e => {
        logger.error(e.message);
        return null;
    })
}