const { pedidoModel } = require('../models/pedidoModel');

const pedidoController = {
    criarPedido: async (req, res) => {
        try {
            const { id_cliente, tipo_entrega, valor_base_kg, valor_base_km, peso_kg, distancia_km, data_pedido } = req.body;

            if (!id_cliente || !tipo_entrega  || !valor_base_kg || !valor_base_km || !peso_kg || !distancia_km || !data_pedido) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente :/' });
            }

            const resultado = await pedidoModel.insertPedido(id_cliente, tipo_entrega, valor_base_kg, valor_base_km, peso_kg, distancia_km, data_pedido);

            res.status(201).json({ message: 'Pedido criado com sucesso', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor :(', error: error.message });

        }

        function validarEntrega(tipo) {
  const tipo_entrega = "javascript";

  // Usamos o operador de igualdade estrita (===) para garantir 
  // que o valor e o tipo (string) sejam idênticos.
  if (tipo_entrega === palavraEsperada || tipo_entrega === "urgente") {
    console.log("Acesso concedido. A palavra está correta.");
    return true;
  } else {
    // Se a condição não for atendida, lançamos um erro.
    throw new Error("Erro: A string não corresponde à palavra esperada.");
  }
}

    }
};

module.exports = { pedidoController };