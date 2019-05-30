const cache = require("./cache");
const sync = require("./sync");
sync.Start();
exports.Seeds = cache.GetSeedsInfo;
exports.Consensus = cache.GetConsensus;