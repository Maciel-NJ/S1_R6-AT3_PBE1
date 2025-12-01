const { entregaModel } = require("../models/entregaModel");
const { pedidoModel } = require("../models/pedidoModel");




/**
 * @description Calcula todos os valores relacionados ao custo de uma entrega,
 * aplicando regras comerciais como acréscimo, desconto e taxa extra.
 *
 * @param {Object} pedido - Objeto contendo os dados do pedido.
 * @param {number} pedido.distancia_km - Distância da entrega em quilômetros.
 * @param {number} pedido.valor_base_km - Valor cobrado por quilômetro.
 * @param {number} pedido.peso_kg - Peso da carga em quilogramas.
 * @param {number} pedido.valor_base_kg - Valor cobrado por quilograma.
 * @param {string} pedido.tipo_entrega - Tipo da entrega ("normal" ou "urgente").
 * 
 * 
 *
 * @returns {Object} Objeto contendo todos os valores calculados:
 *    {
 *      valorDistancia: number,
 *      valorPeso: number,
 *      acrescimo: number,
 *      desconto: number,
 *      taxaExtra: number,
 *      valorFinal: number
 *    }
 */function calcularValoresEntrega(pedido) {

  const valorDistancia = pedido.distancia_km * pedido.valor_base_km;
  const valorPeso      = pedido.peso_kg      * pedido.valor_base_kg;

  let valorBase = valorDistancia + valorPeso;

  let acrescimo = pedido.tipo_entrega === "urgente" ? valorBase * 0.20 : 0;

  let valorFinal = valorBase + acrescimo;

  let desconto = valorFinal > 500 ? valorFinal * 0.10 : 0;

  valorFinal -= desconto;

  let taxaExtra = pedido.peso_kg > 50 ? 15 : 0;

  valorFinal += taxaExtra;

  return { valorDistancia, valorPeso, acrescimo, desconto, taxaExtra, valorFinal };
}





    /**
 * @description Controlador responsável por calcular o valor final de uma entrega
 * com base no ID do pedido enviado pelo cliente.
 *
 * @param {Object} req - Objeto da requisição HTTP.
 * @param {Object} req.body - Corpo da requisição.
 * @param {number} req.body.pedidoId - ID do pedido cuja entrega será calculada.
 *
 * @param {Object} res - Objeto da resposta HTTP.
 *
 * @returns {JSON} Retorna mensagem de sucesso, os valores calculados,
 *                 e o ID do pedido; ou uma mensagem de erro.
 */ 
module.exports = {
   calcularEntrega: async (req, res) => {
    try {
      const { pedidoId } = req.body;

      
      const pedido = await pedidoModel.buscarPedidoPorId(pedidoId);
      if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado :/ " });

      
      const valores = calcularValoresEntrega(pedido);

      
      await entregaModel.atualizarEntrega(pedidoId, valores);

      res.json({
        mensagem: "Entrega calculada com sucesso! :) ",
        pedidoId,
        valores
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao calcular a entrega :( " });
    }
  }
};






