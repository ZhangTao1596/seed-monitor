const express = require("express");
const bodyparser = require("body-parser");
const handler = require("./handler");
const port = require("../config");
const logger = require("../utils").logger;
let app = express();

app.use(bodyparser.json());

app.get("/api/seeds", handler.GetSeeds);
app.get("/api/consensus", handler.GetConsensus);

exports.Start = () => {
    let server = app.listen(port, err => {
        if (err) {
            logger.error(err.message);
            process.exit(1);
            return;
        }
        logger.info(`voice server start listening on ${server.address().address}:${server.address().port}.`)
    })
}

