import Sequelize = require('sequelize');

import connection = require("../Sequelize");
import {DefineModelAttributes} from "sequelize";


let model:DefineModelAttributes<any> = {
  mail : {type: Sequelize.STRING}
};

export = connection.define('contact', model);


