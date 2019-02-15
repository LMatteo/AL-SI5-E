import express = require("express");
import bodyParser = require("body-parser");
import {Queue} from "./queue/Queue";
import {Contract} from "./entity/Contract";

const app: express.Express = express();

app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log("new request");
    next();
});
app.use(bodyParser.json());

app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.contentType("application/json");
    next();
});
let contracts: Contract[] = [];
let host: string = process.env.blablamove_queue || "amqp://localhost:5672";

app.get('/searchContract', function (req, res) {
    if(contracts.length < 1){
        res.statusCode = 404;
        res.send("No contracts found");
    }else{
        res.send(contracts[contracts.length - 1]);
    }
});
let queue: Queue = new Queue(host);

queue.initializeConnection()
    .then(function () {
        queue.setConsumer(function (contract: Contract) {
            contracts.push(contract);
        });

        app.listen(7080, () => {
            console.log("Server listen 7080" )
        });
    }).catch(function () {
    console.log("FATAL : cannot connect to the queue " + host);
});