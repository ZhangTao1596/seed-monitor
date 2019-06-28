const consensus = require("../config").consensus;
const logger = require("../utils").logger;
let mainnetSeeds = new Map();
let testnetSeeds = new Map();

exports.SetVersion = (net, seed, version) => {
    let seedsInfo = null;
    if (net === "mainnet")
        seedsInfo = mainnetSeeds;
    else 
        seedsInfo = testnetSeeds;
    let value = seedsInfo.get(seed);
    if (!value) {
        value = {
            url: seed,
            version: "--",
            height: "--",
            type: "rpc",
            latency: "--"
        }
    }
    if (version == "--") {
        value = {
            url: seed,
            version: "--",
            height: "--",
            type: "rpc",
            latency: "--"
        }
    }
    value.version = version;
    seedsInfo.set(seed, value);
}

exports.SetHeight = (net, seed, height) => {
    let seedsInfo = null;
    if (net === "mainnet")
        seedsInfo = mainnetSeeds;
    else 
        seedsInfo = testnetSeeds;
    let value = seedsInfo.get(seed);
    if (!value) {
        value = {
            url: seed,
            version: "--",
            height: "--",
            type: "rpc",
            latency: "--"
        }
    }
    if (height == "--") {
        value = {
            url: seed,
            version: "--",
            height: "--",
            type: "rpc",
            latency: "--"
        }
    }
    value.height = height;
    seedsInfo.set(seed, value);
}

exports.SetLatency = (net, seed, latency) => {
    let seedsInfo = null;
    if (net === "mainnet")
        seedsInfo = mainnetSeeds;
    else 
        seedsInfo = testnetSeeds;
    let value = seedsInfo.get(seed);
    if (!value) {
        value = {
            url: seed,
            version: "--",
            height: "--",
            type: "rpc",
            latency: latency
        }
    }
    if (latency == "--") {
        value = {
            url: seed,
            version: "--",
            height: "--",
            type: "rpc",
            latency: "--"
        }
    }
    value.height = height;
    seedsInfo.set(seed, value);
}

exports.GetSeedsInfo = () => {
    return {
        mainnet: [...mainnetSeeds.values()].sort((f, s) => {
            if (f.url.length < s.url.length) return -1;
            if (s.url.length < f.url.length) return 1;
            if (f.url < s.url) return -1
            return 1;
        }),
        testnet: [...testnetSeeds.values()].sort((f, s) => {
            if (f.url.length < s.url.length) return -1;
            if (s.url.length < f.url.length) return 1;
            if (f.url < s.url) return -1
            return 1;
        })
    };
}

exports.GetConsensus = () => {
    return consensus;
}