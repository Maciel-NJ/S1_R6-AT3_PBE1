const express = require('express');
const router = express.Router();

//Referencio os arquivos de rota que irei trabalhar

const {clienteRoutes} = require('./clienteRoutes');
const {pedidoRoutes} = require('./pedidoRoutes');  
const {entregaRoutes} = require('./entregasRoutes');


router.use('/', clienteRoutes); 
router.use('/', pedidoRoutes);
router.use('/', entregaRoutes);


module.exports= {router};