const model = require("./model");
const mysql = require("mysql"); // Conexion a la base de datos
const pool = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    database: "testdb",
    user: "root",
    password: "123456"
});

function queryOrder(id) {
    return new Promise(function (resolve, reject) {
        let order;
        let client;
        let pizzas = [];
        let drinks = [];

        pool.getConnection(function (err, connection) {
            if (err) { 
                console.error("ERROR EN LA CONEXION DE MYSQL", err); 
                reject(null);
            }
            /* Busca y obtener el adicional
            function queryExtra(id) {
                let extra = null;
                connection.query("SELECT * FROM ORDEN_PIZZA OP JOIN ADICIONAL A ON OP.ID_ADICIONAL = A.ID WHERE A.ID = ?", [id], (error, rows) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    console.log("ADICIONAL");
                    //console.log(rows);
                    if (rows.length >= 1) {
                        extra = new model.Extra(rows[0].ID, rows[0].DESCRIPCION, rows[0].PRECIO_ADICIONAL);
                    }
                    console.log(extra);
                });
                return extra;
            }*/
            
            // Obtener las pizzas
            connection.query("SELECT * FROM ORDEN_PIZZA OP JOIN PIZZA P ON P.ID = OP.ID_PIZZA WHERE OP.ID_ORDEN = ?", [id], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                rows.forEach(row => {
                    console.log(row.ID_PIZZA);
                    let pizza = new model.Pizza(row.ID_PIZZA, row.DESCRIPCION, row.CANTIDAD, row.PRECIO_PIZZA);
                    pizzas.push(pizza);
                });
            });

            // Obtener las bebidas
            connection.query("SELECT * FROM ORDEN_BEBIDA OB JOIN BEBIDA B ON B.ID = OB.ID_BEBIDA WHERE OB.ID_ORDEN = ?", [id], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                rows.forEach(row => {
                    console.log(row.ID_BEBIDA);
                    let drink = new model.Drink(row.ID, row.DESCRIPCION, row.CANTIDAD, row.PRECIO);
                    drinks.push(drink);
                });
            });

            // Obtener el cliente 
            connection.query("SELECT C.* FROM CLIENTE C JOIN ORDEN O ON C.CEDULA = O.ID_CLIENTE WHERE O.ID = ?", [id], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                client = new model.Client(rows[0].CEDULA, rows[0].NOMBRE, rows[0].TELEFONO, rows[0].CELULAR, rows[0].DIRECCION, rows[0].CIUDAD);
            });

            // Obtener el pedido
            connection.query("SELECT * FROM ORDEN WHERE ID = ?", [id], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                order = new model.Order(id, client, rows[0].ESTADO, rows[0].FECHA, rows[0].METODO_PAGO, pizzas, drinks);
                connection.release();
                console.log(order);
                resolve(order);
            });
        });
    });
}

function insertOrder(order) {
    if (insertClient(order.Client)) {
        let sqlStament = "INSERT INTO ORDEN (ID, ID_CLIENTE, FECHA, PRECIO) VALUES (?,?,?,?)";
        pool.query(sqlStament, [order.Id, order.Client.id, order.Date, order.Price], (error, rows) => {
            if (error) {
                console.error(error);
                throw error;
            }
            console.log(rows);
        });

        order.Pizzas.forEach(pizza => {
            let sqlStament = "INSERT INTO ORDEN_PIZZA VALUES (?,?,?,?,?,?)";
            pool.query(sqlStament, [order.Id, pizza.Id, pizza.Extra.Id, pizza.Price, pizza.Extra.Price, pizza.Quantity], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                console.log(rows);
            });
        });

        order.Drinks.forEach(drink => {
            let sqlStament = "INSERT INTO ORDEN_BEBIDA VALUES (?,?,?,?)";
            pool.query(sqlStament, [order.Id, drink.Id, drink.Price, drink.Quantity], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                console.log(rows);
            });
        });
    }
}

function insertClient(client) {
    let sqlStament = "INSERT INTO CLIENTE VALUES (?,?,?,?,?,?)";
    pool.query(sqlStament, [client.id, client.fullName, client.phone, client.cellphone, client.addres, client.city], (error, rows) => {
        if (error) {
            console.error(error);
            throw error;
        }
        console.log(rows);
    });
    return true;
}

module.exports.saveOrder = insertOrder;
module.exports.queryOrder = queryOrder;