var restify = require("restify");
var builder = require("botbuilder");
var dotenv = require("dotenv");

// Obtener variables de configuracion
dotenv.config();

// Crear servidor http
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT, function () {
    console.log("%s listening at %s", server.name, server.url);
});

// Servir caperta de imágenes
/*server.get(/\/img\/?./, restify.plugins.serveStatic({
    directory: "./img/"
  }));*/

// Conector del bot framework service
var botConnector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
});

// Creacion del bot
var bot = new builder.UniversalBot(botConnector);
server.post("/api/messages", botConnector.listen());

// Dialogs
bot.dialog("/", [
    function (session) {
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
                session.beginDialog("search");
                break;
        }
    },
    function (session) {
        builder.Prompts.confirm(session, "Desea realizar algo más", {
            listStyle: builder.ListStyle.button
        });
    },
    function (session, results) {
        switch (results.reponse) {
            case "si":
                session.reset("/");
                break;
            case "no":
                session.send("Gracias por preferirnos, espero que volvamos hablar pronto.");
                session.send("Disfruta tu pedido.");
                session.endConvesation();
                break;
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
bot.dialog("search", require("./searchDialog")).triggerAction({
    matches: [/\bconsultar\b/ig, /\bver\b/ig, /\bestado\b/ig],
    onSelectAction: function (session, args) {
        session.beginDialog(args.action, args);
    }
});