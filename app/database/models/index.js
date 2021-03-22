const Sequelize = require('sequelize');
const fs=require('fs')
const path = require('path');
const env = process.env.NODE_ENV || 'local';
const config = require('../../config/config').get(env);

console.log("db data", config.DATABASE)


const sequelize = new Sequelize(config.DATABASE.dbConnectUrl?config.DATABASE.dbConnectUrl:config.DATABASE.dbname, config.DATABASE.username, config.DATABASE.pass, {
    host: config.DATABASE.host,
    dialect: 'postgres',
});



let db = {};
let models = [];

try {
    fs.readdirSync(__dirname).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    }).forEach(function (file) {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;

    });


    Object.keys(db).forEach(function (modelName) {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db);

            models.push(db[modelName]);
        }
    });
     sequelize.sync({alter: true});
    console.log('Connection has been established successfully.');

}catch (err){
    console.error('Unable to connect to the database:', err);

}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.models = models;

module.exports = db;

