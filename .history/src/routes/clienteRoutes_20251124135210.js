const express = require('express');
const clienteRoutes = express.Router();

const { clienteController } = require('../controller/clienteController');

clienteRoutes.post('/clientes', clienteController.adicionarCliente);
clienteRoutes.get('/clientes', clienteController.selecionarTodosClintes);


module.exports = { clienteRoutes };