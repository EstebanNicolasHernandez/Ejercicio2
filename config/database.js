const mysql = require("mysql");
const mysqlConnection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "ehernDB#01",
    database: "TE2020_TP2",
    multipleStatements: true,
})


mysqlConnection.connect((error) => {
    if (!error) {
        console.log("Conexión establecida correctamente");
    } else {
        console.log("Fallo en la conexión a la base de datos");
    }
});

module.exports = mysqlConnection;