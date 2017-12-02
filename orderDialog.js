const builder = require("botbuilder");
//const model = require("./model");

// Dialogo para ordenar el pedido y solicitar la información del cliente
module.exports = [
    function (session) {
        session.beginDialog("pizza");
    },
    function (session, results) {
        session.dialogData.pizza = results.response;
        // TODO : concatenar el nombre de la pizza
        builder.Prompts.number(session, "¿Cuantas pizzas quieres llevar? (Por favor ingresa la cantidad en digitos).");
    },
    function (session, results) {
        print(results.response);
        session.dialogData.quantity = results.response;
        builder.Prompts.choice(session, "¿De que tamaño quieres la pizza?", ["small", "medium", "large", "extra large"], {
            listStyle: builder.ListStyle.button,
            recognizeNumbers: true,
            recognizeOrdinals: true
        });
    },
    function (session, results) {
        print(results.response.entity);
        session.dialogData.size = results.response.entity;
        builder.Prompts.confirm(session, "¿Desea agregarle borde de que a su pizza?", {
            listStyle: builder.ListStyle.button,
            recognizeNumbers: true,
            recognizeOrdinals: true
        });
    },
    function (session, results) {
        print(results.response);
        session.dialogData.cheezeBorder = results.response;
        builder.Prompts.confirm(session, "¿Deseas incluir alguna bebida en el pedido?", {
            listStyle: builder.ListStyle.button,
            recognizeNumbers: true,
            recognizeOrdinals: true
        });
    },
    function (session, results, next) {
        if (results.response) {
            session.beginDialog("drink");
        } else {
            next();
        }
    },
    function (session, results, next) {
        print(results.response);
        if (results.response) {
            session.dialogData.drink = results.response;
            // TODO : concatenar el nombre de la bebida
            builder.Prompts.choice(session, "¿De que tamaño deseas las bebidas?", ["1.5 L", "2.5 L"], {
                listStyle: builder.ListStyle.button,
                recognizeNumbers: true,
                recognizeOrdinals: true
            });
        } else {
            next();
        }
    },
    function (session, results, next) {
        print(results.response);
        if (results.response) {
            session.dialogData.drinkSize = results.response.entity;
            // TODO : concatenar el nombre de la bebida
            builder.Prompts.number(session, "¿Cuantas bebidas quieres llevar? (Por favor ingresa la cantidad en digitos).");        
        } else {
            next();
        }
    },
    function (session, results) {
        print(results.response);
        if (results.response) {
            session.dialogData.drinkQuantity = results.response;
        }
        builder.Prompts.choice(session, "¿Con cuál medio de pago deseas pagar el pedido?", ["efectivo", "datáfono"], {
            listStyle: builder.ListStyle.button,
            recognizeNumbers: true,
            recognizeOrdinals: true
        });
    },
    function (session, results) {
        print(results.response.entity);
        session.dialogData.pay = results.response.entity;
        builder.Prompts.text(session, "¿A qué dirección será entregado el pedido?");
    },
    function (session, results) {
        print(results.response);
        session.dialogData.address = results.response;
        builder.Prompts.text(session, "¿A nombre de quién, se realiza el pedido?");
    },
    function (session, results) {
        print(results.response);
        session.dialogData.name = results.response;
        builder.Prompts.text(session, "¿Un número de celular en el que pueda ser contactado, en caso de que sea requerido?");
    },
    function (session, results) {
        print(results.response);
        session.dialogData.cellphone = results.response;

        session.send("Muy bien, aquí está el recibo de tu pedido. Por favor verifica que todo esta en orden.");
        
        let receiptCard = new builder.ReceiptCard(session);
        receiptCard.title("Recibo pedido")
            .items([
                {
                    title: "Titulo",
                    subtitle: "Subtitulo",
                    text: "texto",
                    quantity: "cantidad",
                    price: "$ 5.000"
                }
            ])
            .buttons([
                builder.CardAction.postBack(session, "confirmar", "Confirmar"),
                builder.CardAction.postBack(session, "cancelar", "Cancelar")
            ]);
        let msg = new builder.Message(session).addAttachment(receiptCard.toAttachment());
        builder.Prompts.text(session, msg);
    },
    function (session, results) {
        print(results.response);
        // TODO : guardar pedido en la base de datos
        session.endDialog();
    }
];

function print(t) {
    console.log("RESPUESTA=" + t);
}