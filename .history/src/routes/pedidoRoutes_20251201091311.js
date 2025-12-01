const express = require('express');
const pedidoRoutes = express.Router();

const {pedidoController} = require('../controller/pedidoController');

pedidoRoutes.post('/pedidos', pedidoController.criarPedido);
pedidoRoutes.put('/pedidos/:idPedido', pedidoController.atualizarPedido);
pedido


module.exports = {pedidoRoutes};