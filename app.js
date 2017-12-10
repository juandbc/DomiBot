"use strict";
const getPizzas = require("./dbHelper").getPizzas;
const getDrinks = require("./dbHelper").getDrinks;

const restify = require("restify");
const builder = require("botbuilder");
const dotenv = require("dotenv");

// Mensajes de saludos
const goodMorning = "Buenos días";
const goodAfternoon = "Buenos tardes";
const goodEvening = "Buenos noches";
const goodBye = "Adiós";

// Variables globales de la lista de pizzas y bebidas
getPizzas().then(pizzas => {
    global.globalPizzas = pizzas;    
});
getDrinks().then(drinks => {
    global.globalDrinks = drinks;
});

// Obtener variables de configuracion
dotenv.config();

// Crear servidor http restify
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT, function () {
    console.log("%s listening at %s", server.name, server.url);
});

// Conector del bot framework service
const botConnector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
});

// Creacion del bot
const bot = new builder.UniversalBot(botConnector, {
    storage: new builder.MemoryBotStorage(),
    localizerSettings: {
        defaultLocale: "es"
    }
});
server.post("/api/messages", botConnector.listen());

const luisId = process.env.LUIS_ID;
const luisKey = process.env.LUIS_KEY;

// URL endpoint y recognizer LUIS
const endpointModel = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${luisId}?subscription-key=${luisKey}&verbose=true&timezoneOffset=-300&q=`;
bot.recognizer(new builder.LuisRecognizer(endpointModel));

bot.on("conversationUpdate", function (message) {
    if (message.membersAdded && message.membersAdded.length > 0) {
        // Say hello
        //let isGroup = message.address.conversation.isGroup;        
        let reply = new builder.Message().address(message.address).text(greet());
        bot.send(reply);
    } else if (message.membersRemoved) {
        // See if bot was removed
        let botId = message.address.bot.id;
        for (let i = 0; i < message.membersRemoved.length; i++) {
            if (message.membersRemoved[i].id === botId) {
                // Say goodbye
                let reply = new builder.Message()
                        .address(message.address)
                        .text(goodBye);
                bot.send(reply);
                break;
            }
        }
    }
});

bot.on("contactRelationUpdate", function (message) {
    if (message.action === "add") {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
                .address(message.address)
                .text("Hola %s... Gracias por añadirme a tu lista de contactos.", name || "there");
        bot.send(reply);
    }
});

// Dialogs
bot.dialog("/", [
    function (session) {
        session.preferredLocale("es", (err) => {
            if (err) console.error("error en el locale", err);
        });        
        builder.Prompts.choice(session, "¿En que puedo ayudarte?", "Ver la carta|Consultar mi pedido", {
            listStyle: builder.ListStyle.button,
            recognizeNumbers: true,
            recognizeOrdinals: true
        });
        session.send("Consejo: si ya sabes lo que quieres pedir, puedes escribirlo y saltarte el menu; en cualquier momento puedes ver la carta con solo decirlo.");
    },
    function (session, results) {
        switch (results.response.entity) {
            case "Ver la carta":
                session.beginDialog("order");
                break;
            case "Consultar mi pedido":
                session.beginDialog("queryOrder", { normal: true});
                break;
        }
    },
    function (session) {
        session.sendTyping();
        setTimeout(() => {
            builder.Prompts.confirm(session, "¿Desea realizar algo más?", {
                listStyle: builder.ListStyle.button
            });
        }, 2000);
    },
    function (session, results) {
        if (results.reponse) {
            session.reset("/");
        } else {
            session.endConversation("Gracias por preferirnos, espero que volvamos hablar pronto.");
        }
    }
]).endConversationAction("end", "Está bien, espero que volvamos hablar pronto. " + goodBye + ".", {
    matches: /\b(adiós|cancelar|adios|chao)\b|\b(muchas gracias|gracias)\b/ig,
    confirmPrompt: "¿Estás seguro que deseas cancelar el pedido?"
});

// Función para saludar de acuerdo a la hora del día
function greet() {
    let time = new Date().getHours();
    let text;
    if (time >= 6 && time <= 11) {
        text = goodMorning;
    } else if (time >= 12 && time <= 18) {
        text = goodAfternoon;
    } else {
        text = goodEvening;
    }
    return text;
}

// Dialogo ordenar pedido
bot.dialog("order", require("./dialogs/orderDialog")).triggerAction({
    matches: [/\bbordenar\b/ig, /\bpedir\b/ig],
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
}).beginDialogAction("orderHelp", "help", { matches: /^help$/ig});

// Dialogo menu de pizzas
bot.dialog("pizzas", require("./dialogs/pizzaDialog")).triggerAction({
    matches: [/ver la carta|(menu|menú) de pizzas/ig, /ver pizzas/ig],
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

// Dialogo menu de bebidas
bot.dialog("drinks", require("./dialogs/drinkDialog")).triggerAction({
    matches: [/ver la carta de bebidas|(menu|menú) de bebidas/ig, /^ver bebidas$/ig],
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

// Dialogo consultar estado del pedido
bot.dialog("queryOrder", require("./dialogs/queryOrderDialog")).triggerAction({
    matches: "consultarPedido",
    confirmPrompt: "Seguro?"
});

// Dialogo ordenar pizza
bot.dialog("orderPizza", require("./dialogs/orderPizzaDialog")).triggerAction({
    matches: "ordenarPizza",
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
}).reloadAction("addPizza", "¿Que pizza deseas añadir?", {
    matches: /\bañadir pizza\b/ig
});

// Dialogo ordenar bebida
/*bot.dialog("orderDrink", require("./dialogs/orderDrinkDialog")).triggerAction({
    matches: "ordenarBebida",
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});*/

// Dialogo cancelar pedido
bot.dialog("cancelOrder", require("./dialogs/cancelOrderDialog")).triggerAction({
    matches: "cancelarPedido",
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

/*
bot.dialog("", require("./dialogs")).triggerAction({
    matches: "cambiarPizza",
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

bot.dialog("", require("./dialogs")).triggerAction({
    matches: "cambiarBebida",
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

bot.dialog("", require("./dialogs")).triggerAction({
    matches: "cambiarTamañoPizza",
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

bot.dialog("", require("./dialogs")).triggerAction({
    matches: "cambiarTamañoBebida",
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

bot.dialog("", require("./dialogs")).triggerAction({
    matches: "removerPizza",
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

bot.dialog("", require("./dialogs")).triggerAction({
    matches: "removerBebida",
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});*/