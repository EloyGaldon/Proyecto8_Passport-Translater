var carroModel=require('../models/carritoModel');

var carroController = {};


//const paginate = require('express-paginate');

carroController.mostrar=function(req,res,next){

    if(req.session.compra){
        var cantidad_productos=0;
        var precio_total=0;
        req.session.compra.forEach((item)=>{
            cantidad_productos+=item.cantidad;
            precio_total+=item.precio;
        });
    }

    if(!req.session.username){
    res.render('carrito', {
        title: 'Carrito de compra',
        layout: '../views/templates/default',
        precioTotal:precio_total,
        cantidadTotal:cantidad_productos,
        carrito: req.session.compra
    });
    }else {
        if (req.session.isAdmin) {
            res.render('carrito', {
                title: 'Carrito de compra',
                layout: '../views/templates/default',
                precioTotal: precio_total,
                cantidadTotal: cantidad_productos,
                isLogged: true,
                isAdmin: true,
                user: req.session.username,
                carrito: req.session.compra
            });
        }
        else {
            res.render('carrito', {
                title: 'Carrito de compra',
                layout: '../views/templates/default',
                precioTotal: precio_total,
                cantidadTotal: cantidad_productos,
                isLogged: true,
                user: req.session.username,
                carrito: req.session.compra
            });
        }
    }
};

carroController.addLinea=function (req, res, next){
    //console.log("entra al controlador");
    var nuevo=true;
    carroModel.addLinea(req.params.id,(err,resultado)=>{
        if(err) {
            res.status(500).json(err);
        }else{
            //console.log(resultado);
            let producto={
                id_producto:resultado[0].id,
                nomb_producto: resultado[0].nombre_viaje,
                cantidad:1,
                precio:resultado[0].precio,
                imagen:resultado[0].imagen,
                fecha:resultado[0].fechas,
                descripcion:resultado[0].descripcion
                };
            //console.log(producto);
            if(!req.session.compra){
                req.session.compra = [];
                req.session.compra.push(producto);
            }else{
                req.session.compra.forEach((item)=>{
                    if(item.id_producto==resultado[0].id){
                        item.cantidad++;
                        item.precio=item.cantidad*resultado[0].precio;
                        nuevo=false;
                    }
                });
                if(nuevo){
                    req.session.compra.push(producto);
                }
            }
            //console.log("vamos a ver si guarda en session");
            //console.log(req.session.compra);
            res.redirect("/#sectionDestinos");

        }
    })

};
carroController.deleteLinea=function(req,res,next){
    let product=req.params.id;
    req.session.compra = req.session.compra.filter((item)=> {return item.id_producto!=product});
    res.redirect("/compra/carrito");
};
carroController.sumarCant=function(req,res,next){
    let product=req.params.id;
    req.session.compra.forEach((item)=> {
        if (item.id_producto == product) {
            let precioUni=item.precio/item.cantidad;
                item.cantidad++;
                item.precio+=precioUni;
        }
    })
    res.redirect("/compra/carrito");
}

carroController.restCant=function(req,res,next){
    let product=req.params.id;
    req.session.compra.forEach((item)=> {
        if (item.id_producto == product && item.cantidad>1) {
            let precioUni=item.precio/item.cantidad;
            item.cantidad--;
            item.precio-=precioUni;
        }
    })
    res.redirect("/compra/carrito");
}

carroController.deleteAll=function (req, res, next){
    req.session.compra = [];
    res.redirect("/compra/carrito");
};

module.exports = carroController;