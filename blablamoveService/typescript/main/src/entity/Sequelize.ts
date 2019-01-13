import Sequelize = require("sequelize"); // ORM

const host = process.env.dbName || 'localhost';
const port = 3306;


// Initialisation de la connection à la BDD
const sequelize = new Sequelize('blablamove', 'user', 'user', {
    host: host,
    protocol: 'tcp',
    dialect: 'mysql',
    port: port,
    logging: false
});

export = sequelize;
