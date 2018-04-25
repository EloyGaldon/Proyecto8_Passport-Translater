let sequelize = require('../connections/sequelizeconnection');
let conn= require ('.././connections/mysqlconnection');
let Sequelize = require('sequelize');
let destinoSeqModel={}

const Destiny=sequelize.define('destinos',{

    nombre_viaje:{
        type: Sequelize.STRING
    },
    fechas:{
        type: Sequelize.STRING
    },
    descripcion:{
        type: Sequelize.STRING
    },
    imagen:{
        type: Sequelize.STRING
    },
    precio:{
        type: Sequelize.INTEGER
    },
    activo:{
        type: Sequelize.BOOLEAN
    }
});


destinoSeqModel.getAllDestinationsPag=(offset, limit, cb)=> {
    Destiny.findAndCountAll({offset:offset,limit:limit}).then((resultado)=>{
        let count=resultado.count;
        let rows=resultado.rows;
        return cb(null,{count,rows});
    }).error((error)=>{
        return cb(error)
    })
};

destinoSeqModel.getAllDestinations=(cb)=>{
    Destiny.findAll().then((resultado)=>{
        return cb(null,resultado);
    }).error((err)=>{
        return cb(err);
    })
};

destinoSeqModel.getDestinations=(cb)=>{
    Destiny.findAll({where:{activo:1}
    }).then((resultado)=>{
        return cb(null,resultado);
    }).error((err)=>{
        return cb(err);
    })
};

destinoSeqModel.createDestination= (destino,cb) =>{
   Destiny.create(destino).then((resultado)=>{
       return cb(null,resultado);
   }).error((error)=>{
       return cb(error);
   })
};

destinoSeqModel.deleteDestination= (id,cb) =>{
    Destiny.destroy({where:{id:id}
    }).then((resultado)=>{
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
};

destinoSeqModel.activaDestination=(id,cb)=> {
    Destiny.findOne({where:{id:id}
    }).then(resultado=>{
        resultado.updateAttributes({'activo':!resultado.activo});
        return cb(null,resultado);
    }).error((error)=>{
        return cb(error);
    })
}
module.exports =destinoSeqModel;