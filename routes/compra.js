var express = require('express');
var router = express.Router();
var destinationsModel =require('.././models/destinationsModel');
var carritoController = require('../controllers/carritoController');



router.get('/carrito', function(req, res, next) {
    carritoController.mostrar(req,res,next);
});

router.get('/deleteAll', function(req,res,next){
    carritoController.deleteAll(req,res,next);
})

router.get('/comprar/:id',(req,res,next)=>{
    //console.log("entra en la ruta");
    carritoController.addLinea(req,res,next);
})

router.get('/sumarCant/:id',(req,res,next)=>{
    //console.log("entra en la ruta");
    carritoController.sumarCant(req,res,next);
})

router.get('/restCant/:id',(req,res,next)=>{
    //console.log("entra en la ruta");
    carritoController.restCant(req,res,next);
})

router.get('/deleteProduc/:id',(req,res,next)=>{
    //console.log("entra en la ruta");
    carritoController.deleteLinea(req,res,next);
})



module.exports = router;
