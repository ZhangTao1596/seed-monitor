const neorpc = require("../neorpc")
const seeds = require("../config").seed;
const logger = require("../utils").logger;
const cache = require("./cache")


function getAllHeight() {
    seeds.mainnet.forEach(seed => {
        neorpc.GetBlockCount(seed)
        .then(h => {
            logger.info(`[sync] get height, seed: ${seed}, height: ${h}`);
            if (!h) {
                cache.SetHeight("mainnet", seed, "unavailable")
                return;
            }
            cache.SetHeight("mainnet", seed, h)
        })
    });
    seeds.testnet.forEach(seed => {
        neorpc.GetBlockCount(seed)
        .then(h => {
            logger.info(`[sync] get height, seed: ${seed}, height: ${h}`);
            if (!h) {
                cache.SetHeight("testnet", seed, "unavailable")
                return;
            }
            cache.SetHeight("testnet", seed, h)
        })
    });
}
function getAllVersion() {
    seeds.mainnet.forEach(seed => {
        neorpc.GetVersion(seed)
        .then(v => {
            logger.info(`[sync] get version, seed: ${seed}, version: ${v}`);
            if (!v) {
                cache.SetVersion("mainnet", seed, "unavailable")
                return;
            }
            cache.SetVersion("mainnet", seed, v)
        })
    });
    seeds.testnet.forEach(seed => {
        neorpc.GetVersion(seed)
        .then(v => {
            logger.info(`[sync] get version, seed: ${seed}, version: ${v}`);
            if (!v) {
                cache.SetVersion("testnet", seed, "unavailable")
                return;
            }
            cache.SetVersion("testnet", seed, v)
        })
    });
}

exports.Start = () => {
    getAllHeight();
    getAllVersion();
    setInterval(getAllHeight, 15000);
    setInterval(getAllVersion, 15000);
}