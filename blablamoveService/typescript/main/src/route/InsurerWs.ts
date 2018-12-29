import express = require('express');
import {Contract} from "../entity/Contract";
import {ContractRegistry} from "../contract-registry/ContractRegistry";
import {HandleContract} from "../contract-registry/HandleContract";
import {Type} from "../entity/Type";
import {Logger} from "../logging/Logger";
import Level = require('../logging/Level');

let router : express.Router = express.Router();
const logger : Logger = new Logger();


router.post("/contracts", (req: express.Request,res: express.Response) => {
    logger.log(Level.info, "adding new contract");

    let contractHandler : HandleContract = new ContractRegistry();
    let type : keyof typeof Type = req.body.contract.typeName;
    let contract : Contract = contractHandler.addContract(Type[type],req.body.contract.description,req.body.contract.mail);
    res.send(JSON.stringify(contract.toJson()));

    logger.log(Level.info, "new contract added");

});

export = router;