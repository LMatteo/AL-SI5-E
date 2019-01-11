import express = require("express");
import { ContractRegistry } from "../components/contract-registry/ContractRegistry";
import { HandleContract } from "../components/contract-registry/HandleContract";
import { Type } from "../entity/Type";
import { Logger } from "../logging/Logger";
import Level = require("../logging/Level");
import { Subscribe } from "../entity/Subscribe";
import { ContractInstance } from "../components/contract-instance/ContractInstance";
import { GetSubscription } from "../components/contract-instance/GetSubscription";
import {Contract} from "../entity/contract/Contract";

let router: express.Router = express.Router();
const logger: Logger = new Logger();

router.post("/contracts", (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "adding new contract");

    let contractHandler: HandleContract = new ContractRegistry();
    let type: keyof typeof Type = req.body.contract.typeName;
    let contract: Contract = contractHandler.addContract(
        Type[type],
        req.body.contract.description,
        req.body.contract.mail
    );
    res.send(JSON.stringify(contract.toJson()));

    logger.log(Level.info, "new contract added");
});

router.get("/subscriptions", (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "listing subscriptions");

    let instanceSubscriptions: GetSubscription = new ContractInstance();
    let subscriptions: Array<
        Subscribe
    > = instanceSubscriptions.getSubscriptions();
    let result: Array<any> = new Array<any>();

    subscriptions.forEach(function(value: Subscribe) {
        result.push(value);
    });

    res.send(result);

    logger.log(Level.info, "subscriptions listed");
});

export = router;
