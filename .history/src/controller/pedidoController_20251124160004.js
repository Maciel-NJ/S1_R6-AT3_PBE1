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
            let { dataPedido, tipontrega, distancia_km, peso_kg, valor_base_km, valor_base_kg } = req.body;

            descricao = descricao.trim();

            if (!idProduto || !descricao || !valor || typeof idProduto !== 'number' || !isNaN(descricao) || isNaN(valor) || descricao.trim().length < 3) {
                return res.status(400), json({ message: 'Verifique os dados enviados e tente novamente' });

            }

            const produtoAtual = await produtoModel.selecionaPeloId(idProduto);
            if (produtoAtual.length === 0) {
                throw new Error('Registro não localizadoo')
            }

            const novaDescricao = descricao ?? produtoAtual[0].descricao;
            const novoValor = valor ?? produtoAtual[0].valor;

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