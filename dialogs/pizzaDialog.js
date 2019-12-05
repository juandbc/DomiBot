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
                builder.CardAction.postBack(session, pizzas[0].id, pizzas[0].size),
                builder.CardAction.postBack(session, pizzas[1].id, pizzas[1].size),
                builder.CardAction.postBack(session, pizzas[2].id, pizzas[2].size),
                builder.CardAction.postBack(session, pizzas[3].id, pizzas[3].size)
            ]);

        let pizzaPepperoniHeroCard = new builder.HeroCard(session)
            .title("Pepperoni")
            .subtitle("Iniciando desde 24.900")
            .text("Doble pepperoni y extraqueso.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_PEXPLO.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[4].id, pizzas[4].size),
                builder.CardAction.postBack(session, pizzas[5].id, pizzas[5].size),
                builder.CardAction.postBack(session, pizzas[6].id, pizzas[6].size),
                builder.CardAction.postBack(session, pizzas[7].id, pizzas[7].size)
            ]);

        let pizzaHawaianaHeroCard = new builder.HeroCard(session)
            .title("Hawaiana")
            .subtitle("Iniciando desde 24.900")
            .text("Extraqueso , Jamón y Piña")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_HNC.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[9].id, pizzas[9].size),
                builder.CardAction.postBack(session, pizzas[8].id, pizzas[8].size),
                builder.CardAction.postBack(session, pizzas[10].id, pizzas[10].size),
                builder.CardAction.postBack(session, pizzas[11].id, pizzas[11].size)
            ]);

        let pizzaHawaianaChickenkHeroCard = new builder.HeroCard(session)
            .title("Hawaiana con pollo")
            .subtitle("Iniciando desde 27.900")
            .text("Queso Mozarella, trocitos de pollo, piña, tocineta y salsa B.B.Q.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_HWC.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[12].id, pizzas[12].size),
                builder.CardAction.postBack(session, pizzas[13].id, pizzas[13].size),
                builder.CardAction.postBack(session, pizzas[14].id, pizzas[14].size),
                builder.CardAction.postBack(session, pizzas[15].id, pizzas[15].size)
            ]);

        let pizzaJamonHeroCard = new builder.HeroCard(session)
            .title("Jamon")
            .subtitle("Iniciando desde 24.900")
            .text("Jalapeño, jamón, tocineta y piña.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_HOLULU.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[16].id, pizzas[16].size),
                builder.CardAction.postBack(session, pizzas[17].id, pizzas[17].size),
                builder.CardAction.postBack(session, pizzas[18].id, pizzas[18].size),
                builder.CardAction.postBack(session, pizzas[19].id, pizzas[19].size)
            ]);

        let pizzaVegetarianaHeroCard = new builder.HeroCard(session)
            .title("Vegetariana")
            .subtitle("Iniciando desde 24.900")
            .text("Cebolla, pimentón, champiñón y tomate.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_VGP.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[20].id, pizzas[20].size),
                builder.CardAction.postBack(session, pizzas[21].id, pizzas[21].size),
                builder.CardAction.postBack(session, pizzas[22].id, pizzas[22].size),
                builder.CardAction.postBack(session, pizzas[23].id, pizzas[23].size)
            ]);

        let pizzaCuatroCarnesHeroCard = new builder.HeroCard(session)
            .title("Cuatro carnes")
            .subtitle("Iniciando desde 27.900")
            .text("Cebolla, pimentón, pepperoni, jamón, champiñón, aceituna, chorizo, carne molida y extraqueso.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_EXV.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[24].id, pizzas[24].size),
                builder.CardAction.postBack(session, pizzas[25].id, pizzas[25].size),
                builder.CardAction.postBack(session, pizzas[26].id, pizzas[26].size),
                builder.CardAction.postBack(session, pizzas[27].id, pizzas[27].size)
            ]);

        let pizzaCaprichosaHeroCard = new builder.HeroCard(session)
            .title("Caprichosa")
            .subtitle("Iniciando desde 27.900")
            .text("Cebolla, pimentón, pepperoni, champiñón y chorizo.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_DX.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[28].id, pizzas[28].size),
                builder.CardAction.postBack(session, pizzas[29].id, pizzas[29].size),
                builder.CardAction.postBack(session, pizzas[30].id, pizzas[30].size),
                builder.CardAction.postBack(session, pizzas[31].id, pizzas[31].size)
            ]);

        let pizzaBbqHeroCard = new builder.HeroCard(session)
            .title("BBQ")
            .subtitle("Iniciando desde 27.900")
            .text("Carne molida, tocineta, maíz tierno, salsa BBQ y cebolla.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_STKB.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, pizzas[32].id, pizzas[32].size),
                builder.CardAction.postBack(session, pizzas[33].id, pizzas[33].size),
                builder.CardAction.postBack(session, pizzas[34].id, pizzas[34].size),
                builder.CardAction.postBack(session, pizzas[35].id, pizzas[35].size)
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