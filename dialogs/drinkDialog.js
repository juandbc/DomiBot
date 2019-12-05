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
                builder.CardImage.create(session, "https://exitocol.vteximg.com.br/arquivos/ids/886046-1920-auto?width=1920&height=auto&aspect=true")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[0].id, drinks[0].volumen),
                builder.CardAction.postBack(session, drinks[1].id, drinks[1].volumen)
            ]);

        let pepsiHeroCard = new builder.HeroCard(session)
            .title("Pepsi")
            .subtitle("Iniciando desde 2000")
            .text("El auténtico sabor de la bebida Pepsi®, una refrescante manera de compartir los mejores momentos")
            .images([
                builder.CardImage.create(session, "https://exitocol.vteximg.com.br/arquivos/ids/911544-1920-auto?width=1920&height=auto&aspect=true")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[2].id, drinks[2].volumen),
                builder.CardAction.postBack(session, drinks[3].id, drinks[3].volumen)
            ]);

        let colombianaHeroCard = new builder.HeroCard(session)
            .title("Colombiana")
            .subtitle("Iniciando desde 2000")
            .text("Esta bebida evoca lo mejor de Colombia, su gente, su cultura, los colores de las diferentes regiones y su música.")
            .images([
                builder.CardImage.create(session, "https://exitocol.vteximg.com.br/arquivos/ids/911519-1920-auto?width=1920&height=auto&aspect=true")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[4].id, drinks[4].volumen),
                builder.CardAction.postBack(session, drinks[5].id, drinks[5].volumen)
            ]);

        let sevenUpHeroCard = new builder.HeroCard(session)
            .title("7UP")
            .subtitle("Iniciando desde 2700")
            .text("Refréscate con 7UP® Original sin cafeína y con sabores 100% naturales para un sabor burbujeante, puro y refrescante.")
            .images([
                builder.CardImage.create(session, "https://exitocol.vteximg.com.br/arquivos/ids/911906-1920-auto?width=1920&height=auto&aspect=true")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[6].id, drinks[6].volumen),
                builder.CardAction.postBack(session, drinks[7].id, drinks[7].volumen)
            ]);

        let manzanaHeroCard = new builder.HeroCard(session)
            .title("Postobon")
            .subtitle("Iniciando desde 2000")
            .text("¡Es única en el mundo por su sabor y color! Esta bebida te invita a tomarte el color rosa de la vida, a disfrutar momentos inolvidables, emociones y sensaciones.")
            .images([
                builder.CardImage.create(session, "https://exitocol.vteximg.com.br/arquivos/ids/911540-1920-auto?width=1920&height=auto&aspect=true")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[8].id, drinks[8].volumen),
                builder.CardAction.postBack(session, drinks[9].id, drinks[9].volumen)
            ]);

        let h2ohHeroCard = new builder.HeroCard(session)
            .title("H2OH")
            .subtitle("Iniciando desde 2.500")
            .text("Agua saborizada y ligeramente gasificada. No contiene calorías y representa la combinación fresca del agua y la diversión de una gaseosa.")
            .images([
                builder.CardImage.create(session, "https://exitocol.vteximg.com.br/arquivos/ids/911581-500-auto?width=500&height=auto&aspect=true")
            ])
            .buttons([
                builder.CardAction.postBack(session, drinks[10].id, drinks[10].volumen),
                builder.CardAction.postBack(session, drinks[11].id, drinks[11].volumen)
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
