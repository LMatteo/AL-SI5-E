import Sequelize = require("sequelize");
import connection = require("../Sequelize");
import { DefineModelAttributes } from "sequelize";

let model: DefineModelAttributes<any> = {
    name: { type: Sequelize.STRING }
};

export = connection.define("item", model);
