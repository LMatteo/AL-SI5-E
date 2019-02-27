import express = require("express");
import bodyParser = require("body-parser");
import { Queue } from "./queue/Queue";
import { Contract } from "./entity/Contract";
import { MongoHelper } from "./mongo/MongoHelper";

const app: express.Express = express();

app.use(bodyParser.json());

app.use(function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    res.contentType("application/json");
    next();
});

const queueHost = process.env.blablamove_queue || "localhost";
let host: string = "amqp://" + queueHost + ":5672";
const mongo = process.env.mongo_host || "localhost";
let mongoHost: string = "mongodb://" + mongo + ":27017/";
let mongoHelper: MongoHelper = new MongoHelper(mongoHost);

app.post("/searchContract", function(req, res) {
    if (req.body.items === undefined || req.body.items.length < 1) {
        res.statusCode = 503;
        res.send("'items' expected");
        return;
    }
    let defaultCursor = mongoHelper.db
        .collection("contracts")
        .find({
            type: { $in: ["heavy", "fragile"] },
            totalprice: { $exists: true }
        })
        .sort({ totalprice: 1 })
        .limit(1);

    if (defaultCursor.hasNext()) {
        defaultCursor.next().then(bestContract => {
            res.send(bestContract);
        });
    } else {
        res.statusCode = 509;
        res.send("No contract matching");
        return;
    }
});
let queue: Queue = new Queue(host);
mongoHelper
    .initialize()
    .then(function() {
        queue
            .initializeConnection()
            .then(function() {
                queue.setConsumer(function(contract: Contract) {
                    mongoHelper.db
                        .collection("contracts")
                        .insertOne(contract, function(err, r) {
                            if (err) throw err;
                        });
                });
                app.listen(7080, () => {
                    console.log("Server listen 7080");
                });
            })
            .catch(function() {
                console.error(
                    "FATAL: cannot connect to mongo database " + mongoHost
                );
            });
    })
    .catch(function() {
        console.log("FATAL : cannot connect to the queue " + host);
    });
