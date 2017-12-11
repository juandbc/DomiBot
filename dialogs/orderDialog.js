"use strict";
/**
 * Diálogo para tomar el pedido completo (pizzas y bebidas) y los datos del cliente
 */
const builder = require("botbuilder");
const model = require("./../model");
const db = require("./../dbHelper");
const print = require("./../utils").print;
const printReceiptCard = require("./../utils").printReceiptCard;
let order;

module.exports = [
    function (session) {
        session.conversationData.pizzas = [];
        session.conversationData.drinks = [];
        session.conversationData.quantitiesPizzas = [];
        session.conversationData.quantitiesDrinks = [];
        session.beginDialog("pizzas");
    },

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

        session.conversationData.pizzas.forEach((e, i) => {
            let p = new model.Pizza(e._id, e._description, session.conversationData.quantitiesPizzas[i], e._price);
            pizzas.push(p);
        });

        session.conversationData.drinks.forEach((e, i) => {
            let d = new model.Pizza(e._id, e._description, session.conversationData.quantitiesDrinks[i], e._price);
            drinks.push(d);
        });

        order = new model.Order(null, null, "PENDIENTE", new Date(Date.now()).toLocaleDateString(), null, pizzas, drinks);
        pizzas.forEach(p => {
            console.log(p);
            items.push({
                title: p.description,
                subtitle: "Cantidad: " + p.quantity,
                price: "$" + p.price
            });
        });
        drinks.forEach(d => {
            console.log(d);
            items.push({
                title: d.description,
                subtitle: "Cantidad: " + d.quantity,
                price: "$" + d.price
            });
        });

        session.send("Muy bien, aquí está el recibo de tu pedido. Por favor verifica que todo esta en orden.");
        let receiptCard = new builder.ReceiptCard(session);
        receiptCard.title("Pedido")
            .items(items)
            .buttons([
                builder.CardAction.postBack(session, "pagar", "Pagar"),
                builder.CardAction.postBack(session, "cancelar", "Cancelar")
            ]);
        let msg = new builder.Message(session).addAttachment(receiptCard.toAttachment());
        builder.Prompts.text(session, msg);
    },
    function (session, results, next) {
        print(results.response);
        switch (results.response) {
            case "pagar":
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
        order.client = new model.Client(results.id, results.name, results.phone, results.cellphone, results.address, results.city);
        db.insertOrder(order).then(r => {
            if (r) {
                session.send("Tu pedido fue registrado en el sistema, dentro de los próximos 30 o 40 minutos estarás disfrutando de tu deliciosa comida.");
                session.send("Aquí te dejo tu recibo");
                session.send(printReceiptCard(session, r));
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