"use strict";
/**
 * Diálogo para cancelar el pedido
 */
const builder = require("botbuilder");

module.exports = [
    function (session) {
        builder.Prompts.confirm(session, "¿Estás seguro que deseas cancelar el pedido?", {
            listStyle: builder.ListStyle.button
        });
    },
    function (session, results) {
        if (results) {
            // TODO: liberar los recursos
            session.conversationData.order = {};
            session.conversationData.pizzas = [];
            session.conversationData.drinks = [];
            session.conversationData.quantitiesPizzas = [];
            session.conversationData.quantitiesDrinks = [];
        } else {
            session.endDialog();
        }
    }
];