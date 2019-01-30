import express = require("express");
import path = require("path");
import { HandleContract } from "../components/contract-registry/HandleContract";
import { Type } from "../entity/Type";
import { Logger } from "../logging/Logger";
import Level = require("../logging/Level");
import { Subscribe } from "../entity/Subscribe";
import { GetSubscription } from "../components/contract-instance/GetSubscription";
import {Contract} from "../entity/contract/Contract";
import {ListContract} from "../components/contract-registry/ListContract";
import container from "../components/InjectionConfig";
import COMPONENT_IDENTIFIER from "../components/InjectionIdentifier";

let router: express.Router = express.Router();
const logger : Logger = new Logger();
let pathFile = __dirname.replace("dist","typescript");
router.use(express.static(path.join(pathFile,'public')));


router.post("/contracts", async (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "adding new contract");

    let contractHandler: HandleContract = container.get(COMPONENT_IDENTIFIER.HandleContract);
    let type: keyof typeof Type = req.body.contract.typeName;
    let contract: Contract = await contractHandler.addContract(
        Type[type],
        req.body.contract.description,
        req.body.contract.mail,
        []
    );
    res.send(JSON.stringify(contract.toJson()));

    logger.log(Level.info, "new contract added");
});

router.get("/contracts", async (req: express.Request,res: express.Response) => {
    logger.log(Level.info, "listing all contracts");

    let contractLister : ListContract = container.get(COMPONENT_IDENTIFIER.ListContract);
    let contracts : Array<Contract> = await contractLister.getAllContract();
    let resArr : Array<any> = new Array<any>();

    contracts.forEach(function (value: Contract) {resArr.push(value.toJson())});
    res.send(resArr);
    logger.log(Level.info, "all contracts listed");

});

router.get("/subscriptions",  (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "listing subscriptions");

    let instanceSubscriptions: GetSubscription = container.get(COMPONENT_IDENTIFIER.GetSubscription);
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

router.get("/userInterfaceInsurer", (req: express.Request,res: express.Response) => {
    logger.log(Level.info, "interface Insurer Used");
    res.contentType("text/html");
    res.sendFile(pathFile+"/public/interfaceInsurer.html");
});

export = router;
