import express = require("express");
import path = require("path");
import { Type } from "../entity/Type";
import { Contract } from "../entity/contract/Contract";
import { Subscribe } from "../entity/Subscription/Subscribe";
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
import { Calculate } from "../entity/Calculate";
import { ContractRegistry } from "../components/contract-registry/ContractRegistry";
import container from "../components/InjectionConfig";
import COMPONENT_IDENTIFIER from "../components/InjectionIdentifier";
import { ControlTravels } from "../components/path-service/ControlTravel";
import { TravelDoNotExist } from "../error/TravelDoNotExist";

let router: express.Router = express.Router();
const logger: Logger = new Logger();
let pathFile = __dirname.replace("dist", "typescript");
router.use(express.static(path.join(pathFile, "public")));

router.get(
    "/contracts/:getType",
    async (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "listing contract");
        let theType: keyof typeof Type = req.params.getType;
        logger.log(Level.info, theType);

        let contractLister: ListContract = container.get(
            COMPONENT_IDENTIFIER.ListContract
        );
        let contracts: Array<Contract> = await contractLister.getContractByType(
            Type[theType]
        );
        logger.log(Level.info, contracts.toString());
        let resArr: Array<any> = new Array<any>();

        contracts.forEach(function(value: Contract) {
            resArr.push(value);
        });

        res.send(resArr);

        logger.log(Level.info, "contract listed");
    }
);

router.get("/contracts/id/:id",
    async (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "get contract by ID");

        let contractLister: ListContract = container.get(
            COMPONENT_IDENTIFIER.ListContract
        );

        let contract = await contractLister.getContractById(req.params.id)
        res.send(contract);

        logger.log(Level.info,'Contract with id : ' + req.params.id + ' sent')
    });

router.post("/subscriptions", async (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "adding new subscriptions");

    let custoId = req.body.customerId;
    let contractId = req.body.contractId;

    let controlTravel : ControlTravels = container.get(COMPONENT_IDENTIFIER.ControlTravels);
    let listContract : ListContract = container.get(COMPONENT_IDENTIFIER.ListContract);

    let contractHandler: Subscription = container.get(
        COMPONENT_IDENTIFIER.Subscription
    );

    let subscription: Subscribe = await contractHandler.subscribeToContract(
        await controlTravel.getCustomerById(custoId),
        await listContract.getContractById(contractId)
    );

    res.send(subscription);
    logger.log(Level.info, "new subscriptions added");
});

router.post("/travels", async (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "creating new travel");
    let controlTravel: ControlTravels = container.get(
        COMPONENT_IDENTIFIER.ControlTravels
    );
    let travel = await controlTravel.createTravel(
        req.body.customerName,
        req.body.departure,
        req.body.destination
    );
    res.send(travel);
    logger.log(Level.info, "new travel created");
});

router.put(
    "/travels/:travelId",
    async (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "adding new item to a travel");
        let item = new Item();
        item.$name = req.body.itemName;
        let controlTravel: ControlTravels = container.get(
            COMPONENT_IDENTIFIER.ControlTravels
        );
        let id: number = parseInt(req.params.travelId);
        try {
            await controlTravel.addItemToTravel(item, id);
            res.status(200).end();
            logger.log(Level.info, "item added");
        } catch (error) {
            if ("getHttpCode" in error) {
                res.status(error.getHttpCode());
            }
            res.send(error.message);
            logger.log(Level.info, "No Such travel");
        }
    }
);

router.get("/travels", async (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "getting travels");
    let controlTravel: ControlTravels = container.get(
        COMPONENT_IDENTIFIER.ControlTravels
    );
    let travels = await controlTravel.findTravel(
        req.query.departure,
        req.query.destinaton
    );
    res.send(travels);
    logger.log(Level.info, "travels got");
});

router.get(
    "/travels/:travelId",
    async (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "getting travel");
        let controlTravel: ControlTravels = container.get(
            COMPONENT_IDENTIFIER.ControlTravels
        );
        let id: number = parseInt(req.params.travelId);
        try {
            let travel = await controlTravel.findTravelById(id);
            res.send(travel);
            logger.log(Level.info, "travel got");
        } catch (error) {
            res.status(error.getHttpCode()).send(error.message);
            logger.log(Level.info, "No Such travel");
        }
    }
);

router.delete(
    "/travels/:travelId",
    (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "finishing travel");
        let controlTravel: ControlTravels = container.get(
            COMPONENT_IDENTIFIER.ControlTravels
        );
        controlTravel.finishTravel(req.params.travelId);
        res.status(200).end();
        logger.log(Level.info, "travel finished");
    }
);

router.put(
    "/travels/:travelId/transporter",
    async (req: express.Request, res: express.Response) => {
        logger.log(Level.info, "selecting travel");
        let controlTravel: ControlTravels = container.get(
            COMPONENT_IDENTIFIER.ControlTravels
        );
        let travelId: number = parseInt(req.params.travelId);
        try {
            let travel = await controlTravel.chooseTravel(
                req.body.transporterName,
                travelId
            );
            res.send(travel);
            logger.log(Level.info, "travel selected");
        } catch (error) {
            res.status(error.getHttpCode()).send(error.message);
            logger.log(Level.info, "No Such travel");
        }
    }
);

router.post("/calculate/type", (req: express.Request, res: express.Response) => {
    logger.log(Level.info, "calculator");
    let action = req.body.action;
    var result;
    if (action === "calculatePrice") {
        let from = req.body.request.from;
        let to = req.body.request.to;
        let contracts = req.body.request.contracts;
        let objects = req.body.request.objects;
        let type = req.body.request.type;
        let calculator: Calculate = new Calculate();
        result = calculator.calcule(from, to, contracts, objects, type);
    } else if (action === "searchType") {
        let objects = req.body.request.objects;
        let calculator: Calculate = new Calculate();
        result = { type: calculator.searchType(objects) };
    } else {
        result = { error: "this action is not define" };
    }
    res.send(result);
});

export = router;
