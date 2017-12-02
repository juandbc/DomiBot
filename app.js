const restify = require("restify");
const builder = require("botbuilder");
const dotenv = require("dotenv");

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

// Dialogs
bot.dialog("/", [
    function (session) {
        session.preferredLocale("es", (err) => {
            if (err) console.error("error en el locale", err);
        });
        let time = new Date().getHours();
        let text;
        if (time >= 6 && time <= 11) {
            text = "Buenos días, ";
        } else if (time >= 12 && time <= 18) {
            text = "Buenas tardes, ";
        } else {
            text = "Buenas noches, ";
        }
        text += "¿En que puedo ayudarte?";
        builder.Prompts.choice(session, text, "Ver la carta|Consultar mi pedido", {
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
                session.beginDialog("query");
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
]).endConversationAction("end", "Está bien, espero que volvamos hablar pronto.", {
    matches: /\b(adiós|cancelar|adios|chao)\b|\b(muchas gracias|gracias)\b/ig,
    confirmPrompt: "¿Estás seguro que deseas cancelar el pedido?"
});

// Dialogo ordenar pedido
bot.dialog("order", require("./orderDialog")).triggerAction({
    matches: [/\bbordenar\b/ig, /\bpedir\b/ig],
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

// Dialogo menu de pizzas
bot.dialog("pizza", require("./pizzaDialog")).triggerAction({
    matches: [/ver la carta|(menu|menú) de pizzas/ig],
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

// Dialogo menu de bebidas
bot.dialog("drink", require("./drinkDialog")).triggerAction({
    matches: [/ver la carta de bebidas|(menu|menú) de bebidas/ig],
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});

// Dialogo consultar estado del pedido
bot.dialog("query", require("./queryOrderDialog")).triggerAction({
    matches: [/\bconsultar\b/ig, /\bver pedido\b/ig, /\bestado\b/ig],
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});