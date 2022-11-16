import { Sequelize, Dialect } from 'sequelize'
import "dotenv/config"
import userModel from "./user.model"

const host = process.env.DB_HOST;
const userName = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD;
const database: any = process.env.DB;
const dialect = process.env.DB_DIALECT as Dialect ;
const operatorsAliases: any = false;

const sequelize = new Sequelize(database, userName, password, {
  host,
  dialect,
  operatorsAliases,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db:any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = userModel(sequelize, Sequelize);

export default db;
