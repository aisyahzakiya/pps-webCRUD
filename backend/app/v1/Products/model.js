import { Sequelize } from "sequelize";

import db from "../../../config/Database.js";

import UsersLogin from "../Users/model.js";
const { DataTypes } = Sequelize;

const Products = db.define('products', {
    // 'id',
    // 'name',
    // 'jenis',
    // 'bulan_lahir',
    // 'tahun_lahir',
    // 'foto',
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            len: [3, 100]
        }
    },
    jenis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    bulan_lahir: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    tahun_lahir: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        }
    }
}, {
    freezeTableName: true
});


// relasi one to many
// 1 user dapat input banyak product
UsersLogin.hasMany(Products);
Products.belongsTo(UsersLogin, { foreignKey: 'userId' });
export default Products;