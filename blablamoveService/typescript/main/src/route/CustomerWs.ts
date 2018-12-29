import express = require('express');
import {Type} from "../entity/Type";
import {ContractRegistry} from "../contract-registry/ContractRegistry";
import {Contract} from "../entity/Contract";
import {ListContract} from "../contract-registry/ListContract";
import {Logger} from "../logging/Logger";
import Level = require('../logging/Level');


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


export = router;