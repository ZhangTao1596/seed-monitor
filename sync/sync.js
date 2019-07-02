const neorpc = require("../neorpc")
const seeds = require("../config").seed;
const logger = require("../utils").logger;
const cache = require("./cache")


function getAllHeight() {
    seeds.mainnet.forEach(seed => {
        neorpc.GetBlockCount(seed)
        .then(h => {
            if (!h) {
                cache.SetHeight("mainnet", seed, "--");
                return;
            }
            logger.info(`[sync] get height, seed: ${seed}, height: ${h[0]}, latency: ${h[1]}`);
            cache.SetHeight("mainnet", seed, h[0]);
            cache.SetLatency("mainet", seed, h[1]);
        })
    });
    seeds.testnet.forEach(seed => {
        neorpc.GetBlockCount(seed)
        .then(h => {
            if (!h) {
                cache.SetHeight("testnet", seed, "--");
                return;
            }
            logger.info(`[sync] get height, seed: ${seed}, height: ${h[0]}, latency: ${h[1]}`);
            cache.SetHeight("testnet", seed, h[0]);
            cache.SetLatency("testnet", seed, h[1]);
        })
    });
}
function getAllVersion() {
    seeds.mainnet.forEach(seed => {
        neorpc.GetVersion(seed)
        .then(v => {
            if (!v) {
                cache.SetVersion("mainnet", seed, "--");
                return;
            }
            logger.info(`[sync] get version, seed: ${seed}, version: ${v}`);
            cache.SetVersion("mainnet", seed, v);
        });
    });
    seeds.testnet.forEach(seed => {
        neorpc.GetVersion(seed)
        .then(v => {
            if (!v) {
                cache.SetVersion("testnet", seed, "--");
                return;
            }
            logger.info(`[sync] get version, seed: ${seed}, version: ${v}`);
            cache.SetVersion("testnet", seed, v);
        })
    });
}

exports.Start = () => {
    getAllHeight();
    getAllVersion();
    setInterval(getAllHeight, 15000);
    setInterval(getAllVersion, 15000);
}