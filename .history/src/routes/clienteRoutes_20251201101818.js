const express = require('express');
const clienteRoutes = express.Router();

const { clienteController } = require('../controller/clienteController');

clienteRoutes.get('/clientes', clienteController.selecionarTodosClientes);
clienteRoutes.post('/clientes', clienteController.adicionarCliente);
clienteRoutes.get('/clientes/:idCliente', clienteController.buscarClientePorId);
clienteRoutes.put('/clientes/:idCliente', clienteController.atualizarCliente);
clienteRoutes.delete('/clientes/:idCliente', clienteController.excluirCliente);



module.exports = { clienteRoutes };