const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;

db.whatsapp = require("./whatsapp.model.js")(sequelize, Sequelize);
db.whatsappHasContact = require("./whatsappHasContact.model.js")(sequelize, Sequelize);
db.whatsappHasTalk = require("./whatsappHasTalk.model.js")(sequelize, Sequelize);

module.exports = db;