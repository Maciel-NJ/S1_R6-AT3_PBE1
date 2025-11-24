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

        function validarEntrega(tipo_entrega) {
            const tiposPermitidos1 = "normal";
            const tiposPermitidos2 ="urgente";


            if (tipo_entrega === tiposPermitidos ||'') {
                return res.status(200).json({ message: "Tipo de entrega válido." });
                return true;
            } else {

                return res.status(400).json({ message: "Tipo de entrega inválido. Use 'normal' ou 'urgente'." });
                return false;
            }
        }
            try {
                validarPalavraSecreta("urgente"); // Isso funciona
            } catch (e) {
                console.error(e.message);
            }
        }

    }
};

module.exports = { pedidoController };