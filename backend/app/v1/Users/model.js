import { Sequelize } from "sequelize";

import db from "../../../config/Database.js";

const {DataTypes} = Sequelize;
 
const UsersLogin = db.define('users',{
    nomor_telepon:{
        type: DataTypes.BIGINT,
        allowNull: false,
        validate:{
            notNull:true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:true,
            len: [3, 100]
        }
    },
    alamat:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:true,
        }
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'pemilik_kucing',
        validate:{
            notNull:true,
        }
    }
},{
    freezeTableName: true
});

export default UsersLogin;

