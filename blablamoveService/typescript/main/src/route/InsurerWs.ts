import express = require("express");
import path = require("path");
import { HandleContract } from "../components/contract-registry/HandleContract";
import { Type } from "../entity/Type";
import { Logger } from "../logging/Logger";
import Level = require("../logging/Level");
import { Subscribe } from "../entity/Subscription/Subscribe";
import { GetSubscription } from "../components/contract-instance/GetSubscription";
import { Contract } from "../entity/contract/Contract";
import { Policy } from "../entity/Policy/Policy";
import { ListContract } from "../components/contract-registry/ListContract";
import container from "../components/InjectionConfig";
import COMPONENT_IDENTIFIER from "../components/InjectionIdentifier";

let router: express.Router = express.Router();
const logger: Logger = new Logger();
let pathFile = __dirname.replace("dist", "typescript");
router.use(express.static(path.join(pathFile, "public")));

router.post(
    "/contracts",
    async (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "adding new contract");

        let contractHandler: HandleContract = container.get(
            COMPONENT_IDENTIFIER.HandleContract
        );

        console.log(req.body);
        let type: keyof typeof Type = req.body.contract.typeName;

        let policiesArray = <any[]>(req.body.contract.policies);
        let policies: Policy[] = [];
        for (let p of policiesArray) {
            policies.push(new Policy(p.name, p.price));
        }
        let contract: Contract = await contractHandler.addContract(
            Type[type],
            req.body.contract.description,
            req.body.contract.mail,
            policies
        );
        res.send(contract);

        logger.log(Level.info, "new contract added");
    }
);

router.get(
    "/contracts",
    async (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "listing all contracts");

        let contractLister: ListContract = container.get(
            COMPONENT_IDENTIFIER.ListContract
        );
        let contracts: Array<Contract> = await contractLister.getAllContract();
        let resArr: Array<any> = new Array<any>();

        contracts.forEach(function(value: Contract) {
            resArr.push(value);
        });
        res.send(resArr);
        logger.log(Level.info, "all contracts listed");
    }
);

router.get(
    "/subscriptions",
    async (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "listing subscriptions");

        let instanceSubscriptions: GetSubscription = container.get(
            COMPONENT_IDENTIFIER.GetSubscription
        );
        let subscriptions: Array<
            Subscribe
        > = await instanceSubscriptions.getSubscriptions();
        let result: Array<any> = new Array<any>();

        subscriptions.forEach(function(value: Subscribe) {
            result.push(value);
        });

        res.send(result);

        logger.log(Level.info, "subscriptions listed");
    }
);

export = router;
