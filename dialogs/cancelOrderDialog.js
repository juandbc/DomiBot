"use strict";
const builder = require("botbuilder");
let cancelOrder = [
    function (session) {
        builder.Prompts.confirm(session, "¿Estás seguro que deseas cancelar el pedido?");
    },
    function (session, results) {
        if (results) {
            session.conversationData.pedido = {};
        } else {
            session.endDialog();
        }
    }
];
module.exports = cancelOrder;