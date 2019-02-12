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

let host: string = process.env.blablamove_queue || "amqp://localhost:5672";


let queue: Queue = new Queue(host);

queue.initializeConnection()
    .then(function () {
        queue.setConsumer(function (contract: Contract) {
            console.log(contract)
        });

        app.listen(7080, () => {
            console.log("Server listen 7080" )
        });
    }).catch(function () {
    console.log("FATAL : cannot connect to the queue " + host);
});