import Sequelize = require("sequelize");
import connection = require("../Sequelize");
import { DefineModelAttributes } from "sequelize";

let model: DefineModelAttributes<any> = {
    insuranceValidation: { type: Sequelize.BOOLEAN },
    pathValidation: { type: Sequelize.BOOLEAN }
};

export = connection.define("validator", model);
