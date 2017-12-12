"use strict";
/**
 * Diálogo para tomar el pedido de pizzas
 */
const Pizza = require("./../model").Pizza;
const builder = require("botbuilder");
const utils = require("./../utils");

module.exports = [
    function (session, args) {
        let items = [];
        let total = 0;

        let quantityEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "builtin.number");
        let sizeEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "tamañoPizza");
        let pizzaEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "pizza");

        pizzaEntities.forEach((entity, index) => {
            let p = global.globalPizzas.find(p => {
                return p.description.toLowerCase().includes(utils.concatEntityText(entity, sizeEntities[index]));
            });
            p.quantity = quantityEntities[index];
            console.log(p);
            session.conversationData.pizzas.push(p);
        });

        session.conversationData.pizzas.forEach(p => {
            items.push({
                title: p.description,
                subtitle: "Cantidad: " + p.quantity,
                price: "$" + p.price
            });
            total += p.price;
        });

        session.send("Muy bien, aquí está el recibo de tu pedido. Por favor verifica que todo esta en orden.");
        let receiptCard = new builder.ReceiptCard(session);
        receiptCard.title("Pedido")
            .items(items)
            .total(total);
        let msg = new builder.Message(session).addAttachment(receiptCard.toAttachment());
        session.send(msg);
        builder.Prompts.confirm(session, "¿Es correcta la información?");
    },
    function (session, results) {
        if (results.response) {
            session.send("Muy bien, ¿Qué más deseas ordenar?");
        } else {
            session.send("Oh! lo siento. Por favor vuelve a intentar, y si aún no puedo entenderte, usa la forma guiada.");
        }
    }
];