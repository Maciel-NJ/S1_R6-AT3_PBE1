const { pedidoModel } = require('../models/pedidoModel');

const pedidoController = {
    criarPedido: async (req, res) => {
        try {
            const { id_cliente, tipo_entrega, valor_base_kg, valor_base_km, peso_kg, distancia_km, data_pedido } = req.body;

            if (!id_cliente || !tipo_entrega === "urgente" || !tipo_entrega === "normal" || !valor_base_kg || !valor_base_km || !peso_kg || !distancia_km || !data_pedido) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente, !!tipos de entrega permitidos são "normal" e "urgente"' });
            }

            const resultado = await pedidoModel.insertPedido(id_cliente, tipo_entrega, valor_base_kg, valor_base_km, peso_kg, distancia_km, data_pedido);

            res.status(201).json({ message: 'Pedido criado com sucesso', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor :(', error: error.message });

        }

       
    },

    atualizarPedido: async (req, res) => {
        try {
            const idPedido = Number(req.params.idPedido);
            let { dataPedido, tipoEntrega, distanciaKm, pesoKg, valorBaseKm, valorBaseKg } = req.body;

            dataPedido = dataPedido.trim();

            if (!idPedido || !dataPedido || !tipoEntrega || !distanciaKm || !pesoKg || !valorBaseKm || !valorBaseKg || typeof idPedido !== 'number' || dataPedido.trim().length < 3) {
                return res.status(400), json({ message: 'Verifique os dados enviados e tente novamente' });

            }

            const pedidoAtual = await pedidoModel.selecionaPeloId(idPedido);
            if (pedidoAtual.length === 0) {
                throw new Error('Pedido não localizado')
            }

            const novaData = dataPedido ?? pedidoAtual[0].dataPedido;
            const novoTipoEntrega = valor ?? produtoAtual[0].valor;

            const resultado = await produtoModel.alterarProduto(idProduto, novaDescricao, novoValor)

            if (resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao atualizar o produto');

            }

            res.status(200).json({ message: 'Registro atualizado com sucesso', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })


        }
    }
    
};

    

module.exports = { pedidoController };