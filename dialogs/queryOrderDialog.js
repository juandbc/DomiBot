"use strict";
const builder = require("botbuilder");
const db = require("./../dbHelper");
const printReceiptCard = require("./../utils").printReceiptCard;
// Dialogo para consultar el estado del pedido
module.exports = [
    function (session, args, next) {
        let msg = "Esta bien, ¿Cuál es el número de pedido?";
        if (args.normal) {
            builder.Prompts.number(session, msg);
        } else {
            let nOrder = builder.EntityRecognizer.findEntity(args.intent.entities, "builtin.number");
            if (!nOrder) {
                builder.Prompts.number(session, msg);
            } else {
                session.dialogData.nOrder = nOrder.entity;
                next();
            }
        }
    },
    function (session, results) {
        session.sendTyping();
        // Buscar el pedido en la base de datos        
        let getOrder = db.queryOrder(session.dialogData.nOrder ? session.dialogData.nOrder : results.response);
        getOrder.then(order => {
            if (order) {
                session.send("Aquí esta el recibo de tu pedido");
                session.send(printReceiptCard(session, order));
                session.endDialog();
            } else {
                session.send("Lo siento, no existe ningún pedido con el número que ingresaste");
                session.endDialog();
            }
        }).catch(rejected => {
            console.error(rejected);
            session.endConversation("Oops! tuve problema en mi sistema, los técnicos lo resolverán pronto. Por favor, vuelve a intentar más tarde.");
        });
    }
];