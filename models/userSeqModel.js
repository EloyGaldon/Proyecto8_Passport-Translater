let sequelize = require('../connections/sequelizeconnection');
let Sequelize = require('sequelize');


const userSetSeq=sequelize.define('cliente',{
    nombre:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.INTEGER
    },
    hash:{
        type:Sequelize.STRING
    },
    isAdmin:{
        type: Sequelize.BOOLEAN
    },
    isAdmin:{
        type: Sequelize.BOOLEAN
    },
    active:{
        type: Sequelize.BOOLEAN
    }

},
    {freezeTableName: true});



module.exports =userSetSeq;