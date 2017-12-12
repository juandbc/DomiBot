"use strict";
/**
 * Diálogo para tomar el pedido de bebidas
 */
const builder = require("botbuilder");
const Drink = require("./../model").Drink;
const utils = require("./../utils");

module.exports = [
    function (session, args, next) {
        if (args && args.reprompt) {
            builder.Prompts.text(session, "¿Qué drink deseas adicionar?");
        } else {
            next();
        }
    },
    function (session, args) {
        let quantityEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "builtin.number");
        let sizeEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "tamañoPizza");
        let pizzaEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "drink");

        pizzaEntities.forEach((entity, index) => {
            global.globalPizzas.forEach(drink => {
                if (drink.id === entity.entity) {
                    let p = new Drink(drink.id, drink.description, quantityEntities[index].entity, drink.price);
                    console.log(p);
                    session.conversationData.pizzas.push(p);
                }
            });
        });

        builder.Prompts.confirm(session, "¿Deseas algo más?");
    },
    function (session, results) {
        if (results.response) {
            session.replaceDialog("orderPizza", { reprompt: true });
        } else {
            // TODO: la tarjeta recibo
            let msg = utils.printReceiptCard();
            session.send(msg);
            builder.Prompts.confirm(session, "¿Es correcta la información?");
        }
    },
    function (session, results) {
        if (results.response) {
            session.send("Muy bien, ¿Qué más deseas ordenar?");
        } else {
            session.send("Oh! lo siento. Por favor vuelve a intentar, intenta usando números para los tamaños de las bebidas. Si aún no puedo entenderte, usa la forma guiada.");
        }
    }
];