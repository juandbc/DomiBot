"use strict";
/**
 * Diálogo para tomar el pedido de pizzas
 */
const Pizza = require("./../model").Pizza;
const builder = require("botbuilder");

module.exports = [
    function (session, args, next) {
        if (args && args.reprompt) {
            builder.Prompts.text(session, "¿Qué pizza deseas adicionar?");
        } else {
            next();
        }
    },
    function (session, args) {
        session.conversationData.pizzas = [];

        let cantidadEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "builtin.number");
        let tamañoEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "tamañoPizza");
        let pizzaEntities = builder.EntityRecognizer.findAllEntities(args.intent.entities, "pizza");

        pizzaEntities.forEach((entity, index) => {
            global.globalPizzas.forEach(pizza => {
                if (pizza.description.toLowerCase() === entity.entity) {
                    let p = new Pizza(pizza.id, pizza.description, cantidadEntities[index].entity, pizza.price);
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
            let msg = receipt;
            session.send(msg);
            builder.Prompts.confirm(session, "¿Es correcta la información?");
        }
    }
];