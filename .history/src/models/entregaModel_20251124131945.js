const pool = require('../config/rsl');

const entregaModel = {


registrarEntrega: async (pIdEntrega, pValorDistancia, pValorPeso, pAcrescimo, pDesconto, pTaxaExtra, pValorFinal, pStatusEntrega, pIdPedido ) => {

     const sql = 'INSERT INTO entregas (id_entrega, valor_distancia, valor_peso, acrescimo, desconto, taxa_extra, valor_final, status_entrega, id_pedido_fk) VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?)';

},

 EntregaModel:async { 
    calcularCusto(distancia, peso, tipo) {
        const valor_km = 2;   // R$ 2 por km
        const valor_kg = 5;   // R$ 5 por kg

        // Valor base
        const valor_distancia = distancia * valor_km;
        const valor_peso = peso * valor_kg;
        let valor_base = valor_distancia + valor_peso;

        // Acrescimo para entrega urgente
        let acrescimo = 0;
        if(tipo.toLowerCase() === 'urgente') {
            acrescimo = valor_base * 0.2;
        }

        let valor_final = valor_base + acrescimo;

        // Desconto se valor final > 500
        if(valor_final > 500) {
            valor_final *= 0.9; // desconto de 10%
        }

        // Taxa extra se peso > 50kg
        if(peso > 50) {
            valor_final += 15;
        }

        return {
            valor_distancia,
            valor_peso,
            acrescimo,
            valor_final: parseFloat(valor_final.toFixed(2))
        };
    }
}

module.exports = EntregaModel;



};
module.exports = { entregaModel };

        