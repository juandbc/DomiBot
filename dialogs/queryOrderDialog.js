"use strict";
const builder = require("botbuilder");
const db = require("./../dbHelper");
// Dialogo para consultar el estado del pedido
module.exports = [
    function (session, args, next) {
        console.log(args);
        let msg = "Esta bien, ¿Cuál es el número de pedido?";
        if (args.normal) {
            builder.Prompts.number(session, msg);
        } else {
            let nOrder = builder.EntityRecognizer.findEntity(args.intent.entities, "builtin.number");
            if (!nOrder) {
                builder.Prompts.number(session, msg);
            } else {
                session.dialogData.nOrder = nOrder.entity;
                next();
            }
        }
    },
    function (session, results) {
        console.log(results);
        session.sendTyping();
        // Buscar el pedido en la base de datos
        console.log(session.dialogData.nOrder ? session.dialogData.nOrder : results.response);
        let getOrder = db.queryOrder(session.dialogData.nOrder ? session.dialogData.nOrder : results.response);
        getOrder.then(order => {
            if (order) {
                session.send("Aquí esta el recibo de tu pedido");
                // Array con los items del pedido
                let items = [];
                order.pizzas.forEach(p => {
                    let i = {
                        title: p.description,
                        subtitle: "Cantidad: " + p.quantity,
                        price: "$" + p.price
                    };
                    items.push(i);
                });

                order.drinks.forEach(d => {
                    let i = {
                        title: d.description,
                        subtitle: "Cantidad: " + d.quantity,
                        price: "$" + d.price
                    };
                    items.push(i);
                });
                // Tarjeta recibo del pedido
                let receiptCard = new builder.ReceiptCard(session);
                receiptCard.title("Recibo pedido")
                    .facts([
                        {
                            key: "Número",
                            value: order.id.toString()
                        },
                        {
                            key: "Fecha",
                            value: order.date.toString()
                        },
                        {
                            key: "Estado",
                            value: order.status.toString()
                        },
                        {
                            key: "Cliente",
                            value: order.client.fullName.toString()
                        },
                        {
                            key: "Cedula",
                            value: order.client.id.toString()
                        },
                        {
                            key: "Método de pago",
                            value: order.payment.toString()
                        },
                        {
                            key: "Dirección de entrega",
                            value: order.client.address.toString()
                        }
                    ])
                    .items(items)
                    .tax(order.tax.toString())
                    .total(order.total.toString());
                let msg = new builder.Message(session).addAttachment(receiptCard.toAttachment());
                builder.Prompts.text(session, msg);
                session.endDialog();
            } else {
                session.send("Lo siento, no existe ningún pedido con el número que ingresaste");
                session.endDialog();
            }
        }).catch(rejected => {
            console.error(rejected);
            session.endConversation("Oops! tuve problema en mi sistema, los técnicos lo resolverán pronto. Por favor, vuelve a intentar más tarde.");
        });
    }
];