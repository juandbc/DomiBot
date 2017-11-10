var builder = require("botbuilder");
// Dialogo para consultar el estado del pedido
module.exports = [
    function (session) {
        builder.Prompts.number(session, "Por favor, ingresa el número de pedido");
    },
    function (session, results) {
        let numberId = results.response.entity;
        // TODO : buscar en la base de datos el pedido
        let pedido;
        if(pedido){
            session.send("Aquí esta la información de tu pedido");
            // TODO : mostrar informacion del pedido en una herocard
        } else {
            session.send("Lo siento, no existe ningún pedido con el número que ingresaste");  
            session.endDialog();
        } 
    }
];