"use strict";
const model = require("./model");
const dotenv = require("dotenv");
const mysql = require("mysql"); // Conexion a la base de datos

dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 50,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Obtener el listado de pizzas
function getPizzas() {
    return new Promise(function (resolve, reject) {
        let pizzas = [];
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error("ERROR EN LA CONEXION DE MYSQL", err);
                reject(null);
            }
            connection.query("SELECT * FROM PIZZA", (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                rows.forEach(row => {
                    //console.log("PIZZA ID: " + row.ID);
                    let pizza = new model.Pizza(row.ID, row.DESCRIPCION, 1, row.PRECIO);
                    pizzas.push(pizza);
                });
                connection.release();
                resolve(pizzas);
            });
        });
    });
}

// Obtener el listado de bebidas
function getDrinks() {
    return new Promise(function (resolve, reject) {
        let drinks = [];
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error("ERROR EN LA CONEXION DE MYSQL", err);
                reject(null);
            }
            connection.query("SELECT * FROM BEBIDA", (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                rows.forEach(row => {
                    //console.log("BEBIDA ID: " + row.ID);
                    let drink = new model.Drink(row.ID, row.DESCRIPCION, 1, row.PRECIO);
                    drinks.push(drink);
                });
                connection.release();
                resolve(drinks);
            });
        });
    });
}

// Busca una pedido por su id
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

            // Obtener las pizzas
            connection.query("SELECT * FROM ORDEN_PIZZA OP JOIN PIZZA P ON P.ID = OP.ID_PIZZA WHERE OP.ID_ORDEN = ?", [id], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                rows.forEach(row => {
                    //console.log(row.ID_PIZZA);
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
                    //console.log(row.ID_BEBIDA);
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
                if (rows.length > 0) {
                    client = new model.Client(rows[0].CEDULA, rows[0].NOMBRE, rows[0].TELEFONO, rows[0].CELULAR, rows[0].DIRECCION, rows[0].CIUDAD);
                }
            });

            // Obtener el pedido
            connection.query("SELECT * FROM ORDEN WHERE ID = ?", [id], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                if (rows.length > 0) {
                    order = new model.Order(id, client, rows[0].ESTADO, rows[0].FECHA, rows[0].METODO_PAGO, pizzas, drinks);
                }
                connection.release();
                console.log(order);
                resolve(order);
            });
        });
    });
}

// Guarda una pedido en el sistema
function insertOrder(order) {
    return new Promise((resolve, reject) => {
        insertClient(order.Client).then(response => {
            if (response) {
                pool.getConnection((err, connection) => {
                    if (err) {
                        console.error("ERROR EN LA CONEXION DE MYSQL", err);
                        reject(false);
                    }
                    connection.beginTransaction(err => {
                        if (err) {
                            console.log("ERROR EN BEGIN TRANSACT");
                            console.error(err);
                            reject(Error("ERROR EN BEGIN TRANSACT"));
                        }
                        let sqlStament = "INSERT INTO ORDEN VALUES (?,?,?,?,?,?,?,?)";
                        connection.query(sqlStament, [order.id, order.client.id, order.status, order.date, order.payment, order.subtotal,
                        order.tax, order.total], (error, rows) => {
                            if (error) {
                                console.log("ERROR EN INSERT ORDEN");
                                console.error(error);
                                connection.rollback(() => {
                                    reject(Error("ERROR EN INSERT ORDEN"));
                                });
                            }
                            // Confirmar los cambios sino deshacerlos
                            connection.commit(function (err) {
                                if (err) {
                                    console.log("ERROR EN COMMIT");
                                    console.error(err);
                                    return connection.rollback(function () {
                                        reject(Error("ERROR EN COMMIT ORDER"));
                                    });
                                }
                            });
                            connection.query("SELECT ID FROM ORDEN ORDER BY FECHA DESC LIMIT 1;", (error, results) => {
                                if (error) {
                                    console.log("ERROR EN GET ORDEN_ID");
                                    console.error(error);
                                    throw error;
                                }
                                order.id = results[0].ID;

                                // Insertar las pizzas
                                order.pizzas.forEach(pizza => {
                                    let sqlStament = "INSERT INTO ORDEN_PIZZA VALUES (?,?,?,?)";
                                    connection.query(sqlStament, [order.id, pizza.id, pizza.price, pizza.quantity], (error, result) => {
                                        if (error) {
                                            console.log("ERROR EN INSERT PIZZAS");
                                            console.error(error);
                                            throw error;
                                        }
                                        console.log(result);
                                    });
                                });

                                // Insertar las bebidas
                                order.drinks.forEach(drink => {
                                    let sqlStament = "INSERT INTO ORDEN_BEBIDA VALUES (?,?,?,?)";
                                    connection.query(sqlStament, [order.id, drink.id, drink.price, drink.quantity], (error, result) => {
                                        if (error) {
                                            console.log("ERROR EN INSERT DRINKS");
                                            console.error(error);
                                            throw error;
                                        }
                                        console.log(result);
                                    });
                                });

                                // Confirmar los cambios sino deshacerlos
                                connection.commit(function (err) {
                                    if (err) {
                                        console.log("ERROR EN COMMIT");
                                        console.error(err);
                                        return connection.rollback(function () {
                                            reject(Error("ERROR EN COMMIT ORDER"));
                                        });
                                    }
                                    connection.release();
                                    console.log("ORDER SUCCESS!");
                                    resolve(order);
                                });
                            });
                        });
                    });
                });
            } else {
                reject(false);
            }
        }).catch(onRejected => {
            console.error(onRejected);
            reject(false);
        });
    });
}

function insertClient(client) {
    let sqlQueryStament = "SELECT CEDULA FROM CLIENTE";
    let sqlInsertStament = "INSERT INTO CLIENTE VALUES (?,?,?,?,?,?)";
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error("ERROR EN LA CONEXION DE MYSQL", err);
                reject(Error("ERROR EN LA CONEXION DE MYSQL"));
            }

            connection.query(sqlQueryStament, (error, rows) => {
                if (error) {
                    console.error(error);
                    reject(Error("ERROR EN QUERY CLIENTE"));
                }
                if (rows.length === 0) {
                    connection.query(sqlInsertStament, [client.id, client.fullName, client.phone, client.cellphone, client.addres, client.city], (error, rows) => {
                        if (error) {
                            console.log("ERROR EN INSERT CLIENTE");
                            console.error(error);
                            reject(Error("ERROR EN INSERT CLIENTE"));
                        }
                        console.log(rows);
                        connection.commit(function (err) {
                            if (err) {
                                console.log("ERROR EN COMMIT");
                                console.error(err);
                                return connection.rollback(function () {
                                    reject(Error("ERROR EN COMMIT CLIENTE"));
                                });
                            }
                            console.log("CLIENT SUCCESS!");
                            connection.release();
                            resolve(true);
                        });
                    });
                }                
            });
        });
    });
}

module.exports.getPizzas = getPizzas;
module.exports.getDrinks = getDrinks;
module.exports.queryOrder = queryOrder;
module.exports.insertOrder = insertOrder;
module.exports.insertClient = insertClient;