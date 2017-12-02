const builder = require("botbuilder");
// Diálogo para el menu de bebidas
module.exports = [
    function (session) {
        // heroCards de las bebidas
        let cocaColaHeroCard = new builder.HeroCard(session)
        .title("Coca Cola")
        .subtitle("Iniciando desde 2300")
        .text("El auténtico sabor de la bebida Coca Cola®, deliciosa con tus comidas")
        .images([
            builder.CardImage.create(session, "https://www.exito.com/images/products/504/0000762816593504/0000762817183876_lrg_a.jpg")
        ])
        .buttons([
            builder.CardAction.postBack(session, "pepsi", "Ordenar")
        ]);

        let pepsiHeroCard = new builder.HeroCard(session)
            .title("Pepsi")
            .subtitle("Iniciando desde 2000")
            .text("El auténtico sabor de la bebida Pepsi®, una refrescante manera de compartir los mejores momentos")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/454/0000684434963454/0000684435839881_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "pepsi", "Ordenar")
            ]);

        let colombianaHeroCard = new builder.HeroCard(session)
            .title("Colombiana")
            .subtitle("Iniciando desde 2000")
            .text("Colombiana")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/456/0000684438963456/0000684439840597_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "colombiana", "Ordenar")
            ]);

        let sevenUpHeroCard = new builder.HeroCard(session)
            .title("7UP")
            .subtitle("Iniciando desde 2700")
            .text("7UP")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/455/0000684436963455/0000684437839883_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "7up", "Ordenar")
            ]);

        let manzanaHeroCard = new builder.HeroCard(session)
            .title("Postobon")
            .subtitle("Iniciando desde 2000")
            .text("Postobon Manzana")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/447/0000684420963447/0000684421836180_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "manzana", "Ordenar")
            ]);

        let h2ohHeroCard = new builder.HeroCard(session)
            .title("H2OH")
            .subtitle("Iniciando desde 2.500")
            .text("H2OH.")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/974/0002523760675974/0002523761016446_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, "h2oh", "Ordenar")
            ]);
        // fin heroCard de las bebidas
        // Array de pizzas
        let drinks = [cocaColaHeroCard, pepsiHeroCard, colombianaHeroCard, sevenUpHeroCard, manzanaHeroCard, h2ohHeroCard];

        let msj = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(drinks);
        builder.Prompts.text(session, msj);
    },
    function (session, results) {
        console.log("RESPUESTA DEL USUARIO = " + results.response);
        session.endDialogWithResult(results);
    }
];