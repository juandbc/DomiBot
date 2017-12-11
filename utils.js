"use strict";
/**
 * Funciones globales que son utilizadas por los diálogos
 */
const builder = require("botbuilder");

// Crear y retorna un recibo del pedido 
function printReceiptCard(session, order) {
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
    return new builder.Message(session).addAttachment(receiptCard.toAttachment());
}

function print(t) {
    console.log("RESPUESTA=" + t);
}

module.exports.printReceiptCard = printReceiptCard;
module.exports.print = print;