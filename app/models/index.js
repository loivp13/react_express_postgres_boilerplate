// get postgres config
const dbConfig = require("../config/db.config");

//init sequelize with connection options
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorial = require("./tutorial.model")(sequelize, Sequelize);
db.comment = require("./tutorial.model")(sequelize, Sequelize);
db.tag = require("./tag.model")(sequelize, Sequelize);

//make tutorial model to have a one to many relationship with comment
db.tutorial.hasMany(db.comment, { as: "comments" });
//make tutorial to have many to many relationship with tags
db.tutorial.belongsToMany(db.tag, {
  through: "tutorial_tag",
  as: "tags",
  foreignKey: "tag_id",
});
//make comment to belong to only one tutorial
db.comment.belongsTo(db.tutorial, {
  foreignKey: "tutorialId",
  as: "tutorial",
});
//make tag to have many to many relationship with tags
db.tag.belongsToMany(db.tutorial, {
  through: "tutorial_tag",
  as: "tags",
  foreignKey: "tutorial_id",
});

module.exports = db;
