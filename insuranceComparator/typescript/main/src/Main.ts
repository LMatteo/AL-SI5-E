import express = require("express");
import bodyParser = require("body-parser");
import {Queue} from "./queue/Queue";
import {Contract} from "./entity/Contract";
import {Item} from "./entity/Item";
import {MongoHelper} from "./mongo/MongoHelper";

const app: express.Express = express();

app.use(bodyParser.json());

app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.contentType("application/json");
    next();
});
let contracts: Contract[] = [];
let host: string = process.env.blablamove_queue || "amqp://localhost:5672";
let mongoHost: string = process.env.mongo_host || "mongodb://localhost:27017/";
let mongoHelper: MongoHelper = new MongoHelper(mongoHost);

app.post('/searchContract', function (req, res) {
    if(req.body.items === undefined || req.body.items.length < 1){
        res.statusCode = 503;
        res.send("'items' expected");
        return;

    }
    mongoHelper.db.collection('contracts').aggregate([ {"$group":{"_id":null,"min":{"$min":"$totalprice"}}}]).each(function (e,ff) {
        console.log("result aggregate");
        console.log(e);
        console.log(ff);

    })
    let bestContract : Contract= undefined;
    for (let i = 0; i < req.body.items.length; i++) {
        let item = req.body.items[i];
        let item1 = new Item(item.name, item.type);
        for (let i = 0; i < contracts.length; i++) {
            if(contracts[i].type ==item1.type){
                if(bestContract === undefined)
                    bestContract = contracts[i];
                else if(bestContract.totalprice > contracts[i].totalprice){
                    bestContract = contracts[i];
                }
            }
        }
        if(bestContract === undefined){
            res.statusCode = 509;
            res.send("No contract matching");
            return;

        }else{
            res.send(bestContract);
        }
    }
    if(contracts.length < 1) {
        res.statusCode = 404;
        res.send("No contracts found");
        return;
    }
});
let queue: Queue = new Queue(host);
mongoHelper.initialize()
    .then(function () {
        queue.initializeConnection()
            .then(function () {
                queue.setConsumer(function (contract: Contract) {
                    contracts.push(contract);
                    console.log("Inserted \n");
                    console.log(  mongoHelper.db);
                    console.log(JSON.stringify(contract));
                    mongoHelper.db.collection("contracts").insertOne(contract,function (err,r) {
                        if(err) throw err;
                    })
                });
                app.listen(7080, () => {
                    console.log("Server listen 7080" )
                });
            }).catch(function () {
                console.error("FATAL: cannot connect to mongo database "+ mongoHost);

        });

    }).catch(function () {
    console.log("FATAL : cannot connect to the queue " + host);
});