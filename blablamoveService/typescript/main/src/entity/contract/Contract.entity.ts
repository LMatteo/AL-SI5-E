import Sequelize = require('sequelize');

import connection = require("../Sequelize");
import {DefineModelAttributes} from "sequelize";
import contactModel = require("../contact/Contact.entity");



let model:DefineModelAttributes<any> = {
    id : {type: Sequelize.UUID, primaryKey: true},
    description : {type : Sequelize.STRING},
    type : {type : Sequelize.STRING},
};



let contract: Sequelize.Model<any, any> = connection.define('contract', model);
let assoc = contract.hasOne(contactModel,{as : 'Contact'});

export = {object : contract,
    contactAssociation : assoc
};

