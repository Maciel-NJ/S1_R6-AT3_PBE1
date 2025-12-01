const { entregaModel } = require("../models/entregaModel");
const { pedidoModel } = require("../models/pedidoModel");




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
 */async function calcularERegistrarEntrega(pedidoId, distanciaKm, pesoKg, tipoEntrega) {
    // --- Cálculos ---
    const valorPorKm = 2.5;     // exemplo
    const valorPorKg = 1.8;     // exemplo

    const valorDistancia = distanciaKm * valorPorKm;
    const valorPeso      = pesoKg * valorPorKg;

    const valorBase = valorDistancia + valorPeso;

    
    let acrescimo = 0;
    if (tipoEntrega === "urgente") {
        acrescimo = valorBase * 0.20;
    }

    let valorFinal = valorBase + acrescimo;

    let desconto = 0;
    if (valorFinal > 500) {
        desconto = valorFinal * 0.10;
        valorFinal -= desconto;
    }

    
    let taxaExtra = 0;
    if (pesoKg > 50) {
        taxaExtra = 15;
        valorFinal += taxaExtra;
    }


   const sql = `
        INSERT INTO entregas (
            pedido_id,
            valor_distancia,
            valor_peso,
            acrescimo,
            desconto,
            taxa_extra,
            valor_final,
            status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

     await db.execute(sql, [
        pedidoId,
        valorDistancia,
        valorPeso,
        acrescimo,
        desconto,
        taxaExtra,
        valorFinal,
        "calculado"
    ]);

    return {
        pedidoId,
        valorDistancia,
        valorPeso,
        acrescimo,
        desconto,
        taxaExtra,
        valorFinal,
        status: "calculado"
    };
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






