import Sequelize = require('sequelize');

import connection = require("../Sequelize");
import {DefineModelAttributes} from "sequelize";
import contactModel = require("../contact/Contact.entity");



let model:DefineModelAttributes<any> = {
    id : {type: Sequelize.UUID},
    description : {type : Sequelize.STRING},
    type : {type : Sequelize.STRING},
};


let contract: Sequelize.Model<any, any> = connection.define('contract', model);

contract.hasOne(contactModel);

export = contract;

