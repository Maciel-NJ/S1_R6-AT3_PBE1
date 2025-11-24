const { pedidoModel } = require('../models/pedidoModel');

const pedidoController = {
    criarPedido: async (req, res) => {
        try {
            const { id_cliente, tipo_entrega, valor_base_kg, valor_base_km, peso_kg, distancia_km, data_pedido } = req.body;

            if (!id_cliente || !tipo_entrega || !valor_base_kg || !valor_base_km || !peso_kg || !distancia_km || !data_pedido) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente :/' });
            }

            const resultado = await pedidoModel.insertPedido(id_cliente, tipo_entrega, valor_base_kg, valor_base_km, peso_kg, distancia_km, data_pedido);

            res.status(201).json({ message: 'Pedido criado com sucesso', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor :(', error: error.message });

        }

        try {
            const tiposPermitidos = ["normal", "urgente"];
            let tipo_entrega = "urgente";
            if (!tiposPermitidos.includes(tipo_entrega)) {
            
                return res.status(400).json({ message: 'Tipo de entrega inválido. Os tipos permitidos são: normal e urgente :/' });

            } else {
                tipo_entrega = tipo_entrega;
            }



        } catch (error) {

        }

    }
};

module.exports = { pedidoController };