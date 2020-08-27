const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./config/database");
const ProductoRoutes = require("./models/producto");

const app = express();

app.use(bodyParser.json());

app.use("/producto", ProductoRoutes);

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Francisco Villanueva application.",
        getProductos: "/listaProductos",
        getProducto: "/producto/:id",
        registrarProducto: "/registrarProducto",
        modificarProducto: "/modificarProducto",
        eliminarProducto: "/borrarProducto/:documento"
    });
});


app.listen(3000);