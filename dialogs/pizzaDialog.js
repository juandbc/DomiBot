"use strict";
/**
 * Diálogo para mostrar el menú de pizzas
 */
const builder = require("botbuilder");

module.exports = [
    function (session) {
        session.sendTyping();
        let pizzas = global.globalPizzas;
        // heroCard de las pizzas
        let pizzaNativaHeroCard = new builder.HeroCard(session)
            .title("Nativa")
            .subtitle("Iniciando desde 27.900")
            .text("Cebolla, pimentón, pepperoni, jamón, champiñón, aceituna, chorizo, carne molida y extraqueso.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_PCOLO.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[2].id, "Small"),
                builder.CardAction.postBack(session, pizzas[1].id, "Medium"),
                builder.CardAction.postBack(session, pizzas[0].id, "Large"),
                builder.CardAction.postBack(session, pizzas[3].id, "Extra large")
            ]);

        let pizzaPepperoniHeroCard = new builder.HeroCard(session)
            .title("Pepperoni")
            .subtitle("Iniciando desde 24.900")
            .text("Doble pepperoni y extraqueso.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_PEXPLO.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[6].id, "Small"),
                builder.CardAction.postBack(session, pizzas[5].id, "Medium"),
                builder.CardAction.postBack(session, pizzas[4].id, "Large"),
                builder.CardAction.postBack(session, pizzas[7].id, "Extra large")
            ]);

        let pizzaHawaianaHeroCard = new builder.HeroCard(session)
            .title("Hawaiana")
            .subtitle("Iniciando desde 24.900")
            .text("Extraqueso , Jamón y Piña")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_HNC.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[10].id, "Small"),
                builder.CardAction.postBack(session, pizzas[9].id, "Medium"),
                builder.CardAction.postBack(session, pizzas[8].id, "Large"),
                builder.CardAction.postBack(session, pizzas[11].id, "Extra large")
            ]);

        let pizzaHawaianaChickenkHeroCard = new builder.HeroCard(session)
            .title("Hawaiana con pollo")
            .subtitle("Iniciando desde 27.900")
            .text("Queso Mozarella, trocitos de pollo, piña, tocineta y salsa B.B.Q.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_HWC.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[14].id, "Small"),
                builder.CardAction.postBack(session, pizzas[13].id, "Medium"),
                builder.CardAction.postBack(session, pizzas[12].id, "Large"),
                builder.CardAction.postBack(session, pizzas[15].id, "Extra large")
            ]);

        let pizzaJamonHeroCard = new builder.HeroCard(session)
            .title("Jamon")
            .subtitle("Iniciando desde 24.900")
            .text("Jalapeño, jamón, tocineta y piña.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_HOLULU.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[18].id, "Small"),
                builder.CardAction.postBack(session, pizzas[17].id, "Medium"),
                builder.CardAction.postBack(session, pizzas[16].id, "Large"),
                builder.CardAction.postBack(session, pizzas[19].id, "Extra large")
            ]);

        let pizzaVegetarianaHeroCard = new builder.HeroCard(session)
            .title("Vegetariana")
            .subtitle("Iniciando desde 24.900")
            .text("Cebolla, pimentón, champiñón y tomate.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_VGP.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[22].id, "Small"),
                builder.CardAction.postBack(session, pizzas[21].id, "Medium"),
                builder.CardAction.postBack(session, pizzas[20].id, "Large"),
                builder.CardAction.postBack(session, pizzas[23].id, "Extra large")
            ]);

        let pizzaCuatroCarnesHeroCard = new builder.HeroCard(session)
            .title("Cuatro carnes")
            .subtitle("Iniciando desde 27.900")
            .text("Cebolla, pimentón, pepperoni, jamón, champiñón, aceituna, chorizo, carne molida y extraqueso.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_EXV.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[26].id, "Small"),
                builder.CardAction.postBack(session, pizzas[25].id, "Medium"),
                builder.CardAction.postBack(session, pizzas[24].id, "Large"),
                builder.CardAction.postBack(session, pizzas[27].id, "Extra large")
            ]);

        let pizzaCaprichosaHeroCard = new builder.HeroCard(session)
            .title("Caprichosa")
            .subtitle("Iniciando desde 27.900")
            .text("Cebolla, pimentón, pepperoni, champiñón y chorizo.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_DX.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[30].id, "Small"),
                builder.CardAction.postBack(session, pizzas[29].id, "Medium"),
                builder.CardAction.postBack(session, pizzas[28].id, "Large"),
                builder.CardAction.postBack(session, pizzas[31].id, "Extra large")
            ]);

        let pizzaBbqHeroCard = new builder.HeroCard(session)
            .title("BBQ")
            .subtitle("Iniciando desde 27.900")
            .text("Carne molida, tocineta, maíz tierno, salsa BBQ y cebolla.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_STKB.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[34].id, "Small"),
                builder.CardAction.postBack(session, pizzas[33].id, "Medium"),
                builder.CardAction.postBack(session, pizzas[32].id, "Large"),
                builder.CardAction.postBack(session, pizzas[35].id, "Extra large")
            ]);
        // Fin de las heroCards
        // Array de pizzas
        let pizzasHeroCards = [pizzaNativaHeroCard, pizzaPepperoniHeroCard, pizzaHawaianaHeroCard, pizzaHawaianaChickenkHeroCard, pizzaJamonHeroCard,
            pizzaVegetarianaHeroCard, pizzaCuatroCarnesHeroCard, pizzaCaprichosaHeroCard, pizzaBbqHeroCard];

        let msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(pizzasHeroCards);
        builder.Prompts.text(session, msg);
    },
    function (session, results) {
        console.log("RESPUESTA DEL USUARIO = " + results.response);
        let pizza = global.globalPizzas.find(p => {
            return p.id === results.response;
        });
        session.conversationData.pizzas.push(pizza);
        builder.Prompts.number(session, "¿Cuantas pizzas " + pizza.description + " quieres llevar? (Por favor ingresa la cantidad en digitos).");
    },
    function (session, results) {
        session.conversationData.quantitiesPizzas.push(results.response);
        builder.Prompts.confirm(session, "¿Desea añadir otra pizza?", {
            listStyle: builder.ListStyle.button
        });
    },
    function (session, results) {
        if (results.response) {
            session.replaceDialog("pizzas");
        } else {
            session.endDialog();
        }
    }
];