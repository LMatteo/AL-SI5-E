import express = require('express');
import {Type} from "../entity/Type";
import {ContractRegistry} from "../contract-registry/ContractRegistry";
import {Contract} from "../entity/Contract";
import {Subscribe} from "../entity/Subscribe";
import {GetSubscription} from "../contract-instance/GetSubscription";
import {ListContract} from "../contract-registry/ListContract";
import {Logger} from "../logging/Logger";
import Level = require('../logging/Level');
import { ContractInstance } from '../contract-instance/ContractInstance';
import { Subscription } from '../contract-instance/Subscription';
import { Customer } from '../entity/Customer';
import { Contact } from '../entity/Contact';


let router : express.Router = express.Router();
const logger : Logger = new Logger();


router.get("/contracts/:type", (req: express.Request,res: express.Response) => {
    logger.log(Level.info, "listing contract");
    let type : keyof typeof Type = req.params.type;

    if(!(req.params.type in Type)){
        res.status(404);
        res.send("no such type")
    }

    let contractLister : ListContract = new ContractRegistry();
    let contracts : Array<Contract> = contractLister.getContractByType(Type[type]);
    let resArr : Array<any> = new Array<any>();

    contracts.forEach(function (value: Contract) {resArr.push(value.toJson())});

    res.send(resArr);

    logger.log(Level.info, "contract listed");
});


router.post("/subscriptions", (req: express.Request,res: express.Response) => {
    logger.log(Level.info, "adding new subscriptions");

    let name : string = req.body.subcribe.name;
    let email : string = req.body.subcribe.email;
    let phone : number = req.body.subcribe.phone;
    let description : string = req.body.subcribe.description;
    let type : keyof typeof Type = req.body.subcribe.typeName;

    let contractHandler : Subscription = new ContractInstance();
    let customer : Customer = new Customer(name,email,phone);
    let contract : Contract = new Contract(description, Type[type], new Contact(name));
    let subscription : Subscribe = contractHandler.subscribeToContract(customer,contract);
   
    res.send(JSON.stringify(subscription.toJson()));
    logger.log(Level.info, "new subscriptions added");

});


export = router;