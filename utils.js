"use strict";
/**
 * Funciones globales que son utilizadas por los diálogos
 */
const builder = require("botbuilder");

/**
 * Crear y retorna un recibo del pedido 
 */ 
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

/**
 * Imprime en consola
 */
function print(t) {
    console.log("RESPUESTA=" + t);
}

/**
 * Obtiene la fecha y tiempo actual
 */
function getCurrentDateTime() {
    return new Date(Date.now()).toLocaleDateString() + " " + new Date(Date.now()).toLocaleTimeString();
}

/**
 *  Concatena los nombres con el tamaño del string de las entities
 */
function concatEntityText(description, size) {
    return description.entity.toLowerCase() + " " + size.entity.toLowerCase();
}

/**
 * Convierte números a texto
 */
function textToNumber(text) {
    switch(text) {
        case "uno":
        return 1;
        case "dos":
        return 2;
        case "tres":
        return 3;
        case "cuatro":
        return 4;
        case "cinco":
        return 5;
        case "seis":
        return 6;
        case "siete":
        return 7;
        case "ocho":
        return 8;
        case "nueve":
        return 9;
        case "diez":
        return 10;
    }
}

module.exports.printReceiptCard = printReceiptCard;
module.exports.print = print;
module.exports.getCurrentDateTime = getCurrentDateTime;
module.exports.concatEntityText = concatEntityText;
module.exports.textToNumber = textToNumber;