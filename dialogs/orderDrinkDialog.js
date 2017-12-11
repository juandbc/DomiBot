"use strict";
/**
 * Diálogo para tomar el pedido de bebidas
 */
const builder = require("botbuilder");
module.exports = [
    function (session) {
        builder.Prompts.text(session, "");
    }
];