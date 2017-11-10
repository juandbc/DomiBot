var builder = require("botbuilder");
// Diálogo para el menu de bebidas
module.exports = [
    function (session) {
        // heroCards de las bebidas
        let pepsiHeroCard = new builder.HeroCard(session)
            .title("Pepsi")
            .subtitle("Iniciando desde 3.800")
            .text("El auténtico sabor de la bebida Pepsi®, una refrescante manera de compartir los mejores momentos")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/F_PEPSI.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "pepsi", "Ordenar")
            ]);

        let colombianaHeroCard = new builder.HeroCard(session)
            .title("Colombiana")
            .subtitle("Iniciando desde 3.800")
            .text("Colombiana")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/F_COLOM.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "colombiana", "Ordenar")
            ]);

        let sevenUpHeroCard = new builder.HeroCard(session)
            .title("7UP")
            .subtitle("Iniciando desde 3.800")
            .text("7UP")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/F_SEVENUP.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "7up", "Ordenar")
            ]);

        let manzanaHeroCard = new builder.HeroCard(session)
            .title("Manzana")
            .subtitle("Iniciando desde 3.800")
            .text("Manzana")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/F_MANZANAP.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "manzana", "Ordenar")
            ]);

        let clubColombiaHeroCard = new builder.HeroCard(session)
            .title("Club Colombia Dorada")
            .subtitle("Iniciando desde 5.500")
            .text("Prohíbese el expendio de bebidas embriagantes a menores de edad Ley 124 de 1994. El exceso de alcohol es perjudicial para la salud Ley 30 de 1986.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/F_CCOLDOR.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "c_clubcolombia", "Ordenar")
            ]);

        let aguilaHeroCard = new builder.HeroCard(session)
            .title("Cerveza Águila")
            .subtitle("Iniciando desde 5.500")
            .text("Prohíbese el expendio de bebidas embriagantes a menores de edad Ley 124 de 1994. El exceso de alcohol es perjudicial para la salud Ley 30 de 1986.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/F_CAGUI.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "c_aguila", "Ordenar")
            ]);

        let aguilaCeroHeroCard = new builder.HeroCard(session)
            .title("Cerveza Águila Cero")
            .subtitle("Iniciando desde 5.500")
            .text("Prohíbese el expendio de bebidas embriagantes a menores de edad Ley 124 de 1994. El exceso de alcohol es perjudicial para la salud Ley 30 de 1986.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/F_AGUICERO.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "c_aguilacero", "Ordenar")
            ]);

        let h2ohHeroCard = new builder.HeroCard(session)
            .title("H2OH")
            .subtitle("Iniciando desde 5.500")
            .text("H2OH.")
            .images([
                builder.CardImage.create(session, "https://cache.dominos.com/olo/5_13_4/assets/build/market/CO/_es/images/img/products/thumbnails/F_H2OH.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "h2oh", "Ordenar")
            ]);
        // fin heroCard de las bebidas
        // Array de pizzas
        let drinks = [pepsiHeroCard, colombianaHeroCard, sevenUpHeroCard, manzanaHeroCard, clubColombiaHeroCard, aguilaHeroCard, aguilaCeroHeroCard, h2ohHeroCard];

        let msj = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(drinks);
        builder.Prompts.text(session, msj);
    },
    function (session, results) {
        console.log("RESPUESTA DEL USUARIO = " + results.response);
        session.endDialog(results.response);
    }
];