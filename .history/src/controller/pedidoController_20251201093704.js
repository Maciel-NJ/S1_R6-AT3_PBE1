const { pedidoModel } = require('../models/pedidoModel');

const pedidoController = {



    /**
 * @description Cria um novo pedido de entrega.
 *
 
 * @param {number} req.body.id_cliente - ID do cliente responsável pelo pedido.
 * @param {string} req.body.tipo_entrega - Tipo da entrega ("normal" ou "urgente").
 * @param {number} req.body.valor_base_kg - Valor base por kg.
 * @param {number} req.body.valor_base_km - Valor base por km.
 * @param {number} req.body.peso_kg - Peso total da carga.
 * @param {number} req.body.distancia_km - Distância em quilômetros.
 * @param {string} req.body.data_pedido - Data do pedido.
 *
 * @route POST /pedidos
 *
 * @returns {JSON} Retorna o resultado da criação do pedido ou mensagem de erro.
 */    criarPedido: async (req, res) => {
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


    /**
 * @description Atualiza os dados de um pedido existente.
 *
 * @param {number} req.params.idPedido - ID do pedido a ser atualizado.
 *
 * 
 * @param {string} req.body.dataPedido - Nova data do pedido 
 * @param {string} req.body.tipoEntrega - Novo tipo de entrega 
 * @param {number} req.body.distanciaKm - Nova distância em km 
 * @param {number} req.body.pesoKg - Novo peso da carga
 * @param {number} req.body.valorBaseKm - Novo valor por km 
 * @param {number} req.body.valorBaseKg - Novo valor por kg 
 *
 * @route PUT /pedidos/:idPedido
 *
 * @returns {JSON} Retorna o resultado da atualização ou uma mensagem de erro.
 */    atualizarPedido: async (req, res) => {
        try {
            const idPedido = Number(req.params.idPedido);
            let { dataPedido, tipoEntrega, distanciaKm, pesoKg, valorBaseKm, valorBaseKg } = req.body;


            if (!idPedido || !dataPedido || !tipoEntrega || !distanciaKm || !pesoKg || !valorBaseKm || !valorBaseKg || typeof idPedido !== 'number' || dataPedido.length < 3) {
                return res.status(400), json({ message: 'Verifique os dados enviados e tente novamente' });

            }

            const pedidoAtual = await pedidoModel.buscarPedidoPorId(idPedido);
            if (pedidoAtual.length === 0) {
                throw new Error('Pedido não localizado')
            }

            const novaData = dataPedido ?? pedidoAtual[0].dataPedido;
            const novoTipoEntrega = tipoEntrega ?? pedidoAtual[0].tipoEntrega;
            const novaDistanciaKm = distanciaKm ?? pedidoAtual[0].distanciaKm;
            const novoPesoKg = pesoKg ?? pedidoAtual[0].pesoKg;
            const novoValorBaseKm = valorBaseKm ?? pedidoAtual[0].valorBaseKm;
            const novoValorBaseKg = valorBaseKg ?? pedidoAtual[0].valorBaseKg;

            const resultado = await pedidoModel.atualizarPedido(novaData, novoTipoEntrega, novaDistanciaKm, novoPesoKg, novoValorBaseKm, novoValorBaseKg, idPedido);

            if (resultado.changedRows === 0) {
                throw new Error('Ocorreu um erro ao atualizar o pedido');

            }

            res.status(200).json({ message: 'Pedido atualizado com sucesso', data: resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message })


        }
    },

    buscarPedidoPorId: async (req, res) => {
        try {
            const pedidoId = Number(req.params.pedidoId);
            if (!pedidoId || typeof pedidoId !== 'number') {
                return res.status(400).json({ message: 'ID do pedido inválido. Verifique e tente novamente :/' });
            }
            const pedido = await pedidoModel.buscarPedidoPorId(pedidoId);
            if (!pedido) {
                return res.status(404).json({ message: 'Pedido não encontrado :(' });
            }
            res.status(200).json({ message: 'Pedido encontrado com sucesso :)', data: pedido });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor :(', errorMessage: error.message });
        }
    },


/**
 * @description Seleciona todos os pedidos cadastrados no sistema.
 * 
 * 
 * @route GET /pedidos
 * 
 * @returns {JSON} Retorna todos os pedidos ou uma mensagem caso não haja dados.
 * 
 */
    selecionarTodosPedidos: async (req, res) => {
        try {
            const resultado = await pedidoModel.buscarTodosPedidos();

            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A tabela selecionada não contém dados' });
            }

            res.status(200).json({ message: 'Todos os pedidos incluídos :)', data: resultado });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor :( ', errorMessage: error.message });
        }

    }
};

module.exports = { pedidoController };