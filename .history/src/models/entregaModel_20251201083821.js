const pool = require('../config/rsl');

const entregaModel = {


/**
 * Busca os dados de entrega vinculados a um pedido específico.
 *
 * @param {*} pedidoId - ID do pedido que deseja consultar.
 *
 * @returns {Promise<Object|null>} Objeto com os dados da entrega, ou null se não existir.
 */  obterEntregaPorPedidoId: async (pedidoId) => {
    const sql = "SELECT * FROM entregas WHERE id_pedido = ?";
    const [rows] = await pool.query(sql, [pedidoId]);
    return rows[0];
  },



  /**
 * Atualiza os dados de entrega relacionados a um pedido.
 *
 * @param {*} pedidoId - ID do pedido que terá a entrega atualizada.
 * @param {*} dados - Objeto contendo os valores da entrega:
 *    {
 *      valorDistancia: number,
 *      valorPeso: number,
 *      acrescimo: number,
 *      desconto: number,
 *      taxaExtra: number,
 *      valorFinal: number
 *    }
 *
 * @returns {Promise<Object>} Resultado da operação no banco (linhas afetadas).
 */  atualizarEntrega: async (pedidoId, dados) => {
    const sql = `
      UPDATE entregas 
      SET valor_distancia = ?, valor_peso = ?, acrescimo = ?, desconto = ?, taxa_extra = ?, valor_final = ?, status_entrega = ?
      WHERE id_pedido = ?
    `;
    const values = [ valorDistancia,valorPeso,acrescimo,desconto,taxaExtra, valorFinal,"calculado",pedidoId
    ];

    const [result] = await pool.query(sql, values);
    return result;
  }

};

module.exports = { entregaModel };
