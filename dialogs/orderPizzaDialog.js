"use strict";
/**
 * Diálogo para tomar el pedido de pizzas
 */
const Pizza = require("./../model").Pizza;
const builder = require("botbuilder");
const utils = require("./../utils");

module.exports = [
    function (session, args, next) {
        let quantityEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "builtin.number");
        let sizeEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "tamañoPizza");
        let pizzaEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "pizza");

        session.conversationData.pizzaEntities = pizzaEntities;
        session.conversationData.quantityEntities = quantityEntities;
        if (sizeEntities.length === 0) {
            builder.Prompts.text(session, "¿Esta bien, y en que tamaño?");
        } else {
            session.conversationData.sizeEntities = sizeEntities;
            next();
        }
    },
    function (session) {
        let items = [];
        let total = 0;

        session.conversationData.pizzaEntities.forEach((entity, index) => {
            let p = global.globalPizzas.find(p => {
                return p.description.toLowerCase().includes(utils.concatEntityText(entity, session.conversationData.sizeEntities[index]));
            });
            p.quantity = utils.textToNumber(session.conversationData.quantityEntities[index].entity);
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
            session.send("Muy bien, ¿Deseas ordenar algo más?");
        } else {
            session.send("Oh! lo siento. Por favor vuelve a intentar, y si aún no puedo entenderte, usa la forma guiada.");
        }
    }
];