const pool = require('../config/rsl');

const entregaModel = {


registrarEntrega: async (pIdEntrega, pValorDistancia, pValorPeso, pAcrescimo, pDesconto, pTaxaExtra, pValorFinal, pStatusEntrega, pIdPedido ) => {

     const sql = 'INSERT INTO entregas (id_entrega, valor_distancia, valor_peso, acrescimo, desconto, taxa_extra, valor_final, status_entrega, id_pedido_fk) VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?)';

};

        const sql = 'INSERT INTO entregas (id_entrega, valor_distancia, valor_peso, acrescimo, desconto, taxa_extra, valor_final, status_entrega, id_pedido_fk) VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?)';