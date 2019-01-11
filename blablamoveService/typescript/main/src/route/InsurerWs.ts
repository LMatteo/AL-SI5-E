import express = require("express");
import path = require("path");
import { ContractRegistry } from "../components/contract-registry/ContractRegistry";
import { HandleContract } from "../components/contract-registry/HandleContract";
import { Type } from "../entity/Type";
import { Logger } from "../logging/Logger";
import Level = require("../logging/Level");
import { Subscribe } from "../entity/Subscribe";
import { ContractInstance } from "../components/contract-instance/ContractInstance";
import { GetSubscription } from "../components/contract-instance/GetSubscription";
import {Contract} from "../entity/contract/Contract";
import {ListContract} from "../components/contract-registry/ListContract";

let router: express.Router = express.Router();
const logger : Logger = new Logger();
let pathFile = __dirname.replace("dist","typescript");
router.use(express.static(path.join(pathFile,'public')));


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

router.get("/contracts", (req: express.Request,res: express.Response) => {
    logger.log(Level.info, "listing all contracts");

    let contractLister : ListContract = new ContractRegistry();
    let contracts : Array<Contract> = contractLister.getAllContract();
    let resArr : Array<any> = new Array<any>();

    contracts.forEach(function (value: Contract) {resArr.push(value.toJson())});
    res.send(resArr);
    logger.log(Level.info, "all contracts listed");

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

router.get("/userInterface", (req: express.Request,res: express.Response) => {
    logger.log(Level.info, "interface Used");
    res.contentType("text/html");
    res.sendFile(pathFile+"/public/index.html");
});

export = router;
