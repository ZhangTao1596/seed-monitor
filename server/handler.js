const sync = require("../sync")

exports.GetSeeds = (req, res) => {
    return res.send(sync.Seeds()).status(200);
}


exports.GetConsensus = (req, res) => {
    return res.send(sync.Consensus()).status(200);
}