import express = require("express");
import { Type } from "../entity/Type";
import { ContractRegistry } from "../components/contract-registry/ContractRegistry";
import { Contract } from "../entity/contract/Contract";
import { Subscribe } from "../entity/Subscribe";
import { GetSubscription } from "../components/contract-instance/GetSubscription";
import { ListContract } from "../components/contract-registry/ListContract";
import { Logger } from "../logging/Logger";
import Level = require("../logging/Level");
import { ContractInstance } from "../components/contract-instance/ContractInstance";
import { Subscription } from "../components/contract-instance/Subscription";
import { Customer } from "../entity/customer/Customer";
import { Contact } from "../entity/contact/Contact";
import { PathService } from "../components/path-service/PathService";
import { Item } from "../entity/item/Item";

let router: express.Router = express.Router();
const logger: Logger = new Logger();

router.get(
    "/contracts/:type",
    (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "listing contract");
        let type: keyof typeof Type = req.params.type;

        if (!(req.params.type in Type)) {
            res.status(404);
            res.send("no such type");
        }

        let contractLister: ListContract = new ContractRegistry();
        let contracts: Array<Contract> = contractLister.getContractByType(
            Type[type]
        );
        let resArr: Array<any> = new Array<any>();

        contracts.forEach(function(value: Contract) {
            resArr.push(value.toJson());
        });

        res.send(resArr);

        logger.log(Level.info, "contract listed");
    }
);

router.post("/subscriptions", (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "adding new subscriptions");

    let name: string = req.body.subcribe.name;
    let email: string = req.body.subcribe.email;
    let phone: number = req.body.subcribe.phone;
    let description: string = req.body.subcribe.description;
    let type: keyof typeof Type = req.body.subcribe.typeName;

    let contractHandler: Subscription = new ContractInstance();
    let customer: Customer = new Customer();
    let contract: Contract = new Contract(
        description,
        Type[type],
        new Contact(name)
    );
    let subscription: Subscribe = contractHandler.subscribeToContract(
        customer,
        contract
    );

    res.send(subscription);
    logger.log(Level.info, "new subscriptions added");
});

router.post("/travels", (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "creating new travel");
    let controlTravel = new PathService();
    let travel = controlTravel.createTravel(
        req.body.customerName,
        req.body.departure,
        req.body.destination
    );
    res.send(
        JSON.stringify(travel, (key, value) => {
            if (key === "customer" || key === "transporter") {
                return value.$name;
            }
            return value;
        })
    );
    logger.log(Level.info, "new travel created");
});

router.put(
    "/travels/:travelId",
    (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "adding new item to a travel");
        let item = new Item();
        item.$name = req.body.itemName;
        let controlTravel = new PathService();
        controlTravel.addItemToTravel(item, req.params.travelId);
        res.status(200).end();
        logger.log(Level.info, "item added");
    }
);

router.get("/travels", (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "getting travels");
    let controlTravel = new PathService();
    let travels = controlTravel.findTravel(
        req.query.departure,
        req.query.destinaton
    );
    res.send(
        JSON.stringify(travels, (key, value) => {
            if (key === "customer" || key === "transporter") {
                return value.$name;
            }
            return value;
        })
    );
    logger.log(Level.info, "travels got");
});

router.get(
    "/travels/:travelId",
    (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "getting travel");
        let controlTravel = new PathService();
        let travel = controlTravel.findTravelById(req.params.travelId);
        if (travel) {
            res.send(travel);
        } else {
            res.send({});
        }

        logger.log(Level.info, "travel got");
    }
);

router.delete(
    "/travels/:travelId",
    (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "finishing travel");
        let controlTravel = new PathService();
        controlTravel.finishTravel(req.params.travelId);
        res.status(200).end();
        logger.log(Level.info, "travel finished");
    }
);

router.put(
    "/travels/:travelId/transporter",
    (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "selecting travel");
        let controlTravel = new PathService();
        let travel = controlTravel.chooseTravel(
            req.body.transporterName,
            req.params.travelId
        );
        res.send(
            JSON.stringify(travel, (key, value) => {
                if (key === "customer" || key === "transporter") {
                    return value.$name;
                }
                return value;
            })
        );
        logger.log(Level.info, "travel selected");
    }
);

export = router;
