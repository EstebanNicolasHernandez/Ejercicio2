const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/database");


Router.get("/listadoProductos", (req, res) => {
    mysqlConnection.query("SELECT * FROM te2020_tp2.producto", (error, rows, fields) => {
        if (!error) {
            res.send(rows);
        } else {
            console.log(error);
        }
    });
});

Router.get("/getProducto", (req, res) => {
    let producto = req.body;
    let values = [producto.idProducto,];
    mysqlConnection.query("SELECT * FROM te2020_tp2.producto WHERE codigo = ?", values, (error, rows, fields) => {
        if (!error) {
            res.send(rows);
        } else {
            console.log(error);
        }
    });
});

/*
 * Insertar producto. Body: codigo, nombre, stock y precio.
 * idProducto: null - Autoincremental
 */
Router.post("/registrarProducto", (req, res) => {
    let producto = req.body;
    let values = [producto.nombre, producto.stock, producto.precio]
    mysqlConnection.query('INSERT INTO `te2020_tp2`.`producto` VALUES (?,?,?)', values, (error, rows, fields) => {
        if (!error) {
            res.send({Mensaje: "El producto ha sido registrada correctamente. ID: " + rows.insertId});
            // res.send(rows); Retorna un JSON con la info sobre el insert en la base de datos.
        } else {
            console.log(error);
        }
    });
});
/*
 * Modificar producto. Body: codigo, nombre, stock y precio.
 */
Router.put("/modificarProducto", (req, res) => {  //aca tengo duda, vamos a necesitar un idProducto, o con codigo solamente lo podremos manejar?
    let body = req.body;
    let values = [body.codigo, body.nombre, body.stock, body.precio];
    // mysqlConnection.query("UPDATE `te2020_tp2`.`producto` SET codigo = '" + values[1] + "',  nombre = '" + values[2] + "', stock = '" + values[3] + "', precio = " + values[4] + " WHERE codigo = '" + values[0] + "'", (error, rows, fields) => {
    mysqlConnection.query("UPDATE `te2020_tp2`.`producto` SET codigo = ?, nombre = ?, stock = ?, precio = ? WHERE codigo = ?", values, (error, rows, fields) => {
        if (!error) {
            res.send('El producto ha sido modificada correctamente. ID: ' + values[4]);
            // res.send(rows);
            // res.status(201).end();
        } else {
            console.log(error);
        }
    });
});

/*
 * Borrar producto. Recibe como parametro el id
 */
Router.delete("/borrarProducto", (req, res) => {
    let producto = req.body;
    let values = [producto.codigo, producto.nombre, producto.stock, producto.precio]
    mysqlConnection.query("DELETE FROM te2020_tp2.producto WHERE id = '" + values[2] + "'", [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.send("El producto con codigo: " + values[1] + " fue eliminada correctamente.");
        } else {
            console.log(error);
        }
    });
});

/**
 *  Date parser
 */
function dateParser(date) {
    return Date.parse(date);
};


/*************************************************************/
/*****************Métodos con Stored Procedure****************/
/*************************************************************/


Router.get("/listProductosSP", (req, res) => {
    mysqlConnection.query('CALL GetProductos()', (error, rows, fields) => {
        if (!error) {
            res.send(rows);
        } else {
            console.log(error);
        }
    });
});

Router.get("/getProductoSP", (req, res) => {
    let producto = req.body;
    var sql = "CALL GetProducto(?)"
    let values = [producto.idProducto,];
    mysqlConnection.query(sql, values,(error, rows, fields) => {
        if (!error) {
            console.log(rows[0]);
            res.send(rows[0]);
        } else {
            console.log(error);
        }
    });
});

Router.post("/registrarProductoSP", (req, res) => {
    let producto = req.body;
    var sql = "CALL InsertProducto(?, ?, ?, ?)"
    let values = [Producto.idProducto, Producto.nombre, producto.apellido, producto.documento, new Date()]
    mysqlConnection.query(sql, values, (error, rows, fields) => {
        if (!error) {
            res.send({Mensaje: "El producto ha sido registrada correctamente."});
            // res.send(rows); //Retorna un JSON con la info sobre el insert en la base de datos.
        } else {
            console.log(error);
        }
    });
});

module.exports = Router;