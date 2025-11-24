const express = require('express');
const pedidoRoutes=express.Router();

const {pedidoController} = require('../controller/pedidoController');

pedidoRoutes.post('/pedidos', pedidoController.criarPedido);
pedidoRoutes.post('/pedidos/item', pedidoController.criarItem);

module.exports = {pedidoRoutes};