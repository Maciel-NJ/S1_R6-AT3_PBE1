const express = require('express');
const pedidoRoutes = express.Router();

const {pedidoController} = require('../controller/pedidoController');

pedidoRoutes.post('/pedidos', pedidoController.criarPedido);
pedidoRoutes.put('/pedidos/:idPedido', pedidoController.atualizarPedido);
pedidoRoutes.get('/pedidos/:idPedido', pedidoController.buscarPedidoPorId);
pedidoRoutes.get('/todosPedidos', pedidoController.selecionarTodosPedidos);
produtoRoutes.delete('/produtos/:idProduto', produtoController.excluirProduto);


module.exports = {pedidoRoutes};