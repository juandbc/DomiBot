var builder = require("botbuilder");
// Diálogo para el menu de pizzas
module.exports = [
    function (session) {
        // heroCard de las pizzas
        let pizzaColombianaHeroCard = new builder.HeroCard(session)
            .title("Colombiana")
            .subtitle("Iniciando desde 27.900")
            .text("Cebolla, pimentón, pepperoni, jamón, champiñón, aceituna, chorizo, carne molida y extraqueso.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_PCOLO.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "p_colom", "Ordenar")
            ]);

        let pizzaFiestaPepperoniHeroCard = new builder.HeroCard(session)
            .title("Fiesta pepperoni")
            .subtitle("Iniciando desde 24.900")
            .text("Doble pepperoni y extraqueso.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_PEXPLO.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "p_fpepperoni", "Ordenar")
            ]);

        let pizzaHawaianaHeroCard = new builder.HeroCard(session)
            .title("Hawaiana")
            .subtitle("Iniciando desde 24.900")
            .text("Extraqueso , Jamón y Piña")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_HNC.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "p_hawaiana", "Ordenar")
            ]);

        let pizzaHonoluluHeroCard = new builder.HeroCard(session)
            .title("Honolulu")
            .subtitle("Iniciando desde 24.900")
            .text("Jalapeño, jamón, tocineta y piña.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_HOLULU.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "p_honolulu", "Ordenar")
            ]);

        let pizzaVegetarianaHeroCard = new builder.HeroCard(session)
            .title("Vegetariana")
            .subtitle("Iniciando desde 24.900")
            .text("Cebolla, pimentón, champiñón y tomate.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_VGP.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "p_vegetariana", "Ordenar")
            ]);

        let pizzaExtraVaganzzaHeroCard = new builder.HeroCard(session)
            .title("Extravaganzza")
            .subtitle("Iniciando desde 27.900")
            .text("Cebolla, pimentón, pepperoni, jamón, champiñón, aceituna, chorizo, carne molida y extraqueso.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_EXV.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "p_extravaganzza", "Ordenar")
            ]);

        let pizzaHawaiianChickHeroCard = new builder.HeroCard(session)
            .title("Hawaiian Chick")
            .subtitle("Iniciando desde 27.900")
            .text("Queso Mozarella, trocitos de pollo, piña, tocineta y salsa B.B.Q.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_HWC.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "p_hawaiian", "Ordenar")
            ]);

        let pizzaDeluxeHeroCard = new builder.HeroCard(session)
            .title("Deluxe")
            .subtitle("Iniciando desde 27.900")
            .text("Cebolla, pimentón, pepperoni, champiñón y chorizo.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_DX.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "p_deluxe", "Ordenar")
            ]);

        let pizzaBbqHeroCard = new builder.HeroCard(session)
            .title("BBQ")
            .subtitle("Iniciando desde 27.900")
            .text("Carne molida, tocineta, maíz tierno, salsa BBQ y cebolla.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/S_STKB.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "p_bbq", "Ordenar")
            ]);
        // Fin de las heroCards
        // Array de pizzas
        let pizzas = [pizzaColombianaHeroCard, pizzaFiestaPepperoniHeroCard, pizzaHawaianaHeroCard, pizzaHonoluluHeroCard, pizzaVegetarianaHeroCard,
            pizzaExtraVaganzzaHeroCard, pizzaDeluxeHeroCard, pizzaBbqHeroCard, pizzaHawaiianChickHeroCard
        ];

        let msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(pizzas);
        builder.Prompts.text(session, msg);
    },
    function (session, results) {
        console.log("RESPUESTA DEL USUARIO = " + results.response);
        session.endDialog(results);
    }
];