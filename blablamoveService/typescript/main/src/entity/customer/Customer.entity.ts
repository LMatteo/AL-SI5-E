import Sequelize = require("sequelize");
import connection = require("../Sequelize");
import { DefineModelAttributes } from "sequelize";
import itemModel = require("../item/Item.entity");
import travelModel = require("../travel/Travel.entity");

let model: DefineModelAttributes<any> = {
    id: { type: Sequelize.UUID, primaryKey: true },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    phone: { type: Sequelize.NUMBER }
};

let customer: Sequelize.Model<any, any> = connection.define("customer", model);
let itemAssoc = customer.hasMany(itemModel);
let shipmentAssoc = customer.hasMany(travelModel.object);
let transportAssoc = customer.hasMany(travelModel.object);

export = {
    object: customer,
    itemAssociation: itemAssoc,
    shipmentAssociation: shipmentAssoc,
    transportAssociation: transportAssoc
};
