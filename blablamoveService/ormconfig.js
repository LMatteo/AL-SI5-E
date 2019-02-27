module.exports = {
    name: "default",
    type: "mysql",
    host: process.env.dbName || "localhost",
    port: 3306,
    username: "user",
    password: "user",
    connectTimeout: 15000,
    database: "blablamove",
    synchronize: false,
    logging: false,
    entities: [
        "dist/main/src/entity/contact/Contact.js",
        "dist/main/src/entity/contract/Contract.js",
        "dist/main/src/entity/customer/Customer.js",
        "dist/main/src/entity/item/Item.js",
        "dist/main/src/entity/travel/Travel.js",
        "dist/main/src/entity/validator/Validator.js",
        "dist/main/src/entity/Policy/Policy.js",
        "dist/main/src/entity/Subscription/Subscribe.js"
    ],
    extra: { connectionLimit: 10 }
};
