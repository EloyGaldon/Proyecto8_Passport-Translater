let conn= require ('../connections/mysqlconnection');

let carrito= {};

carrito.addLinea=(id,cb) =>{
    //console.log("entra al modelo");
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query("SELECT * FROM destinos WHERE id=?", id, function (error, resultado) {
        if (error) return cb(error);
        else {
            return cb(error,resultado);
        }
    })
};

module.exports=carrito;