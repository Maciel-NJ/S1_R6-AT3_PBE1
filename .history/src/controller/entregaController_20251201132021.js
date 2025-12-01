const { entregaModel } = require("../models/entregaModel");
const { pedidoModel } = require("../models/pedidoModel");



  const entregaController = {



  /**
   * @description Calcula todos os valores relacionados ao custo de uma entrega,
   * aplicando regras comerciais como acréscimo, desconto e taxa extra.
   *
   * 
   * @param {number} pedido.distancia_km - Distância da entrega em quilômetros.
   * @param {number} pedido.valor_base_km - Valor cobrado por quilômetro.
   * @param {number} pedido.peso_kg - Peso da carga em quilogramas.
   * @param {number} pedido.valor_base_kg - Valor cobrado por quilograma.
   * @param {string} pedido.tipo_entrega - Tipo da entrega ("normal" ou "urgente").
   * 
   * @route POST /calcularEntrega
   *
   * @returns {JSON} Objeto contendo todos os valores calculados:
   *    {
   *      valorDistancia: number,
   *      valorPeso: number,
   *      acrescimo: number,
   *      desconto: number,
   *      taxaExtra: number,
   *      valorFinal: number
   *    }
   */calcularValoresEntrega: async (pedido) => {

      const valorDistancia = pedido.distancia_km * pedido.valor_base_km;
      const valorPeso = pedido.peso_kg * pedido.valor_base_kg;

      let valorBase = valorDistancia + valorPeso;

      let acrescimo = pedido.tipo_entrega === "urgente" ? valorBase * 0.20 : 0;

      let valorFinal = valorBase + acrescimo;

      let desconto = valorFinal > 500 ? valorFinal * 0.10 : 0;

      valorFinal -= desconto;

      let taxaExtra = pedido.peso_kg > 50 ? 15 : 0;

      valorFinal += taxaExtra;

      return { valorDistancia, valorPeso, acrescimo, desconto, taxaExtra, valorFinal };
    },





    salvarEntrega: async (req, res) => {
    try {
      const {
        pedido_id,
        valor_distancia,
        valor_peso,
        acrescimo,
        desconto,
        taxa_extra,
        valor_final
      } = req.body;

      const idEntrega = await entregaModel.inserirDadosEntrega({
        pedido_id,
        valor_distancia,
        valor_peso,
        acrescimo,
        desconto,
        taxa_extra,
        valor_final,
        status: "calculado"
      });

      res.status(201).json({
        mensagem: "Entrega registrada com sucesso!",
        entrega_id: idEntrega
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao registrar entrega." });
    }
  }

  }

/**
* @description Controlador responsável por calcular o valor final de uma entrega
* com base no ID do pedido enviado pelo cliente.
*
* @param {number} req.body.pedidoId - ID do pedido cuja entrega será calculada.
*
* @route POST /calcularEntrega
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



module.exports = { entregaController };



