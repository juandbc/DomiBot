"use strict";
/**
 * Diálogo para mostrar el menú de bebidas
 */
const builder = require("botbuilder");
module.exports = [
    function (session) {
        let drinks = global.globalDrinks;
        // heroCards de las bebidas
        let cocaColaHeroCard = new builder.HeroCard(session)
            .title("Coca Cola")
            .subtitle("Iniciando desde 2300")
            .text("El auténtico sabor de la bebida Coca Cola®, deliciosa con tus comidas")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/504/0000762816593504/0000762817183876_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[1].id, "1.5L"),
                builder.CardAction.postBack(session, drinks[0].id, "2.5L")
            ]);

        let pepsiHeroCard = new builder.HeroCard(session)
            .title("Pepsi")
            .subtitle("Iniciando desde 2000")
            .text("El auténtico sabor de la bebida Pepsi®, una refrescante manera de compartir los mejores momentos")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/454/0000684434963454/0000684435839881_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[2].id, "1.5L"),
                builder.CardAction.postBack(session, drinks[3].id, "2.5L")
            ]);

        let colombianaHeroCard = new builder.HeroCard(session)
            .title("Colombiana")
            .subtitle("Iniciando desde 2000")
            .text("Colombiana")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/456/0000684438963456/0000684439840597_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[5].id, "1.5L"),
                builder.CardAction.postBack(session, drinks[4].id, "2.5L")
            ]);

        let sevenUpHeroCard = new builder.HeroCard(session)
            .title("7UP")
            .subtitle("Iniciando desde 2700")
            .text("7UP")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/455/0000684436963455/0000684437839883_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[7].id, "1.5L"),
                builder.CardAction.postBack(session, drinks[6].id, "2.5L")
            ]);

        let manzanaHeroCard = new builder.HeroCard(session)
            .title("Postobon")
            .subtitle("Iniciando desde 2000")
            .text("Postobon Manzana")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/447/0000684420963447/0000684421836180_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[9].id, "1.5L"),
                builder.CardAction.postBack(session, drinks[8].id, "2.5L")
            ]);

        let h2ohHeroCard = new builder.HeroCard(session)
            .title("H2OH")
            .subtitle("Iniciando desde 2.500")
            .text("H2OH.")
            .images([
                builder.CardImage.create(session, "https://www.exito.com/images/products/974/0002523760675974/0002523761016446_lrg_a.jpg")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[11].id, "1.5L"),
                builder.CardAction.postBack(session, drinks[10].id, "2.5L")
            ]);
        // fin heroCard de las bebidas
        // Array de pizzas
        let drinksHeroCards = [cocaColaHeroCard, pepsiHeroCard, colombianaHeroCard, sevenUpHeroCard, manzanaHeroCard, h2ohHeroCard];

        let msj = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(drinksHeroCards);
        builder.Prompts.text(session, msj);
    },
    function (session, results) {
        console.log("RESPUESTA DEL USUARIO = " + results.response);
        let drink = global.globalDrinks.find(d => {
            return d.id === results.response;
        });
        session.conversationData.drinks.push(drink);
        builder.Prompts.number(session, "¿Cuantas bebidas " + drink.description + " quieres llevar? (Por favor ingresa la cantidad en digitos).");        
    }, 
    function (session, results) {
        session.conversationData.quantitiesDrinks.push(results.response);
        builder.Prompts.confirm(session, "¿Desea añadir otra bebida?", {
            listStyle: builder.ListStyle.button
        });
    },
    function (session, results) {
        if (results.response) {
            session.replaceDialog("drinks");
        } else {
            session.endDialog();            
        }
    }
];