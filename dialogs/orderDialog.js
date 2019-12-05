"use strict";
/**
 * Diálogo para tomar el pedido completo (pizzas y bebidas) y los datos del cliente
 */
const builder = require("botbuilder");
const model = require("./../model");
const db = require("./../dbHelper");
const utils = require("./../utils");

let order;

module.exports = [
    function (session) {        
        session.beginDialog("pizzas");
    },
    // TODO : ordenar cascada, agregar dialog de bebidas
    function (session) {
        builder.Prompts.confirm(session, "¿Deseas incluir alguna bebida en el pedido?", {
            listStyle: builder.ListStyle.button,
            recognizeNumbers: true,
            recognizeOrdinals: true
        });
    },
    function (session, results, next) {
        if (results.response) {
            session.beginDialog("drinks");
        } else {
            next();
        }
    },
    function (session) {
        session.sendTyping();
        let pizzas = [];
        let drinks = [];
        let items = [];
        let total = 0;

        session.conversationData.pizzas.forEach((e, i) => {
            let p = new model.Pizza(e._id, e._description, session.conversationData.quantitiesPizzas[i], e._size, e._price);
            pizzas.push(p);
        });

        session.conversationData.drinks.forEach((e, i) => {
            let d = new model.Drink(e._id, e._description, session.conversationData.quantitiesDrinks[i], e._volumen, e._price);
            drinks.push(d);
        });

        order = new model.Order(null, null, "PENDIENTE", utils.getCurrentDateTime(), null, pizzas, drinks);
        pizzas.forEach(p => {
            console.log(p);
            total += p.price;

            items.push({
                title: p.description + "-" + p.size,
                subtitle: "Cantidad: " + p.quantity,
                price: "$" + p.price
            });
        });

        drinks.forEach(d => {
            console.log(d);
            total += d.price;

            items.push({
                title: d.description + "-" + d.volumen,
                subtitle: "Cantidad: " + d.quantity,
                price: "$" + d.price
            });
        });

        items.push({
            title: "Total",
            price: `$${total}`
        });

        session.send("Muy bien, aquí está el recibo de tu pedido. Por favor verifica que todo esta en orden.");
        let receiptCard = new builder.ReceiptCard(session);
        receiptCard.title("Pedido")
            .items(items)
            .buttons([
                builder.CardAction.postBack(session, "confirmar", "Confirmar"),
                builder.CardAction.postBack(session, "cancelar", "Cancelar")
            ]);
        let msg = new builder.Message(session).addAttachment(receiptCard.toAttachment());
        builder.Prompts.text(session, msg);
    },
    function (session, results, next) {
        utils.print(results.response);
        switch (results.response) {
            case "confirmar":
                session.beginDialog("dataClient");
                break;
            case "cancelar":
                next();
                break;
            default:
                next();
        }
    },
    function (session, results) {
        session.sendTyping();
        order.payment = results.payment.toUpperCase();
        order.client = new model.Client(results.id, results.name, results.phone, results.cellphone, results.address, results.city);
        db.insertOrder(order).then(response => {
            if (response) {
                session.send("Tu pedido fue registrado en el sistema, dentro de los próximos 30 o 40 minutos estarás disfrutando de tu deliciosa comida.");
                session.send("Aquí te dejo tu recibo");
                session.send(utils.printReceiptCard(session, response));
            } else {
                session.send("Lamentamos las moletias pero, sucedió un error al registrar tu pedido. Nuestros ingenieros están trabajando para solucionar este problema.");
                session.send("Por favor comunícate por medio de otro canal para realizar tu pedido.");
            }
            session.endDialog();
        }).catch(r => {
            console.log("REJECTED");
            console.error(r);
            session.send("Lamentamos las moletias pero, sucedió un error al registrar tu pedido. Nuestros ingenieros están trabajando para solucionar este problema.");
            session.send("Por favor comunícate por medio de otro canal para realizar tu pedido.");
            session.endDialog();
        });
    }
];
