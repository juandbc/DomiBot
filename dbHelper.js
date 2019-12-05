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
            connection.query("SELECT id, descripcion, tamanyo, precio FROM pizza", (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                rows.forEach(row => {
                    // console.log(`pizza: ${row.id} - ${row.descripcion} - ${row.tamanyo}`);
                    let pizza = new model.Pizza(row.id, row.descripcion, 1, row.tamanyo, row.precio);
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
            connection.query("SELECT id, descripcion, volumen, precio FROM bebida", (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                rows.forEach(row => {
                    // console.log(`bebida: ${row.id} - ${row.descripcion} - ${row.volumen}`);
                    let drink = new model.Drink(row.id, row.descripcion, 1, row.volumen, row.precio);
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
            connection.query("SELECT * FROM orden_pizza OP JOIN pizza P ON P.id = OP.id_pizza WHERE OP.id_orden = ?", [id], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                rows.forEach(row => {
                    //console.log(row.id_pizza);
                    let pizza = new model.Pizza(row.id_pizza, row.descripcion, row.cantidad, row.precio_pizza);
                    pizzas.push(pizza);
                });
            });

            // Obtener las bebidas
            connection.query("SELECT * FROM orden_bebida OB JOIN bebida B ON B.id = OB.id_bebida WHERE OB.id_orden = ?", [id], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                rows.forEach(row => {
                    //console.log(row.ID_BEBIDA);
                    let drink = new model.Drink(row.id, row.descripcion, row.cantidad, row.precio);
                    drinks.push(drink);
                });
            });

            // Obtener el cliente 
            connection.query("SELECT C.* FROM cliente C JOIN orden O ON C.cedula = O.id_cliente WHERE O.id = ?", [id], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                if (rows.length > 0) {
                    client = new model.Client(rows[0].cedula, rows[0].nombre, rows[0].telefono, rows[0].celular, rows[0].direccion, rows[0].ciudad);
                }
            });

            // Obtener el pedido
            connection.query("SELECT * FROM orden WHERE id = ?", [id], (error, rows) => {
                if (error) {
                    console.error(error);
                    throw error;
                }
                if (rows.length > 0) {
                    order = new model.Order(id, client, rows[0].estado, rows[0].fecha, rows[0].metodo_pago, pizzas, drinks);
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
        insertClient(order.client).then(response => {
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
                        let sqlStament = "INSERT INTO orden VALUES (?,?,?,?,?,?,?,?)";
                        connection.query(sqlStament, [order.id, order.client.id, order.status, order.date, order.payment, order.subtotal,
                        order.tax, order.total], (error) => {
                            if (error) {
                                console.log("ERROR EN INSERT orden");
                                console.error(error);
                                connection.rollback(() => {
                                    reject(Error("ERROR EN INSERT orden"));
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
                            connection.query("SELECT id FROM orden ORDER BY fecha DESC LIMIT 1;", (error, results) => {
                                if (error) {
                                    console.log("ERROR EN GET ORDEN_ID");
                                    console.error(error);
                                    throw error;
                                }
                                order.id = results[0].id;

                                // Insertar las pizzas
                                order.pizzas.forEach(pizza => {
                                    let sqlStament = "INSERT INTO orden_pizza VALUES (?,?,?,?)";
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
                                    let sqlStament = "INSERT INTO orden_bebida VALUES (?,?,?,?)";
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
    let sqlQueryStament = "SELECT cedula FROM cliente";
    let sqlInsertStament = "INSERT INTO cliente VALUES (?,?,?,?,?,?)";
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error("ERROR EN LA CONEXION DE MYSQL", err);
                reject(Error("ERROR EN LA CONEXION DE MYSQL"));
            }

            connection.query(sqlQueryStament, (error, rows) => {
                if (error) {
                    console.error(error);
                    reject(Error("ERROR EN QUERY cliente"));
                }
                if (rows.length === 0) {
                    console.log(client);
                    connection.query(sqlInsertStament, [client.id, client.fullName, client.phone, client.cellphone, client.address, client.city], (error, rows) => {
                        if (error) {
                            console.log("ERROR EN INSERT cliente");
                            console.error(error);
                            reject(Error("ERROR EN INSERT cliente"));
                        }
                        console.log(rows);
                        connection.commit(function (err) {
                            if (err) {
                                console.log("ERROR EN COMMIT");
                                console.error(err);
                                return connection.rollback(function () {
                                    reject(Error("ERROR EN COMMIT cliente"));
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