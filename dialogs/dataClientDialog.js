"use strict";
/**
 * Diálogo para solicitar los datos del cliente
 */
const builder = require("botbuilder");

function print(t) {
    console.log("RESPUESTA=" + t);
}

module.exports = [
    function (session) {
        builder.Prompts.choice(session, "¿Con cuál medio de pago deseas pagar el pedido?", ["efectivo", "datáfono"], {
            listStyle: builder.ListStyle.button,
            recognizeNumbers: true,
            recognizeOrdinals: true
        });
    },
    function (session, results) {
        print(results.response.entity);
        session.dialogData.payment = results.response.entity;
        builder.Prompts.text(session, "¿A nombre de quién, se realiza el pedido?");
    },
    function(session, results) {
        print(results.response.entity);
        session.dialogData.name = results.response;
        builder.Prompts.number(session, "¿Número de identificación de la persona?");        
    },
    function (session, results) {
        print(results.response);
        session.dialogData.id = results.response;
        builder.Prompts.text(session, "¿En qué dirección será entregado el pedido?");
    },
    function (session, results) {
        print(results.response);
        session.dialogData.address = results.response;
        builder.Prompts.text(session, "¿En que ciudad se encuentra?");
    },
    function (session, results) {
        print(results.response);
        session.dialogData.city = results.response;
        builder.Prompts.number(session, "¿Número de teléfono fijo?");
    }, 
    function (session, results) {
        print(results.response);
        session.dialogData.phone = results.response;
        builder.Prompts.number(session, "¿Número de celular en el que pueda ser contactado, en caso de que sea requerido?");
    }, 
    function (session, results) {        
        session.endDialogWithResult({
            payment: session.dialogData.payment,
            id: session.dialogData.id,
            name: session.dialogData.name,
            address: session.dialogData.address,
            city: session.dialogData.city,
            phone: session.dialogData.phone,
            cellphone: results.response
        });
    }
];