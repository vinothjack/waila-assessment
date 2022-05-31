const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('Users',{
    id:{
        type:DataTypes.NUMBER,
        autoIncrement:true,
        primaryKey:true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false

    },
    dateofbrith:{
        type:DataTypes.DATEONLY,
        defaultValue:Sequelize.NOW
    },
    phonenumber:{
        type:DataTypes.NUMBER,
        allowNull:true,
    },
    password:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:Sequelize.NOW
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:Sequelize.NOW
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    } 

})

module.exports=User