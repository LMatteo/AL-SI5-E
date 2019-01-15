import Sequelize = require("sequelize");
import connection = require("../Sequelize");
import { DefineModelAttributes } from "sequelize";
import validatorModel = require("../validator/Validator.entity");
import itemModel = require("../item/Item.entity");
import customerModel = require("../customer/Customer.entity");

let model: DefineModelAttributes<any> = {
    id: { type: Sequelize.UUID, primaryKey: true },
    departure: { type: Sequelize.STRING },
    destination: { type: Sequelize.STRING }
};

let travel: Sequelize.Model<any, any> = connection.define("travel", model);
let validatorAssoc = travel.hasOne(validatorModel);
let itemAssoc = travel.hasMany(itemModel);
let customerAssoc = travel.hasOne(customerModel.object);
let transporterAssoc = travel.hasOne(customerModel.object);

export = {
    object: travel,
    validatorAssociation: validatorAssoc,
    itemAssociation: itemAssoc,
    customerAssociation: customerAssoc,
    transporterAssociation: transporterAssoc
};
