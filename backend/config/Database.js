
import { Sequelize } from "sequelize";
const db = new Sequelize('crud_pps','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;