const express = require('express');
const router = express.Router();

//Referencio os arquivos de rota que irei trabalhar
const {produtoRoutes} = require('./produtoRoutes');
const {clienteRoutes} = require('./clienteRoutes');  
const {pedidoRoutes} = require('./pedidoRoutes');


router.use('/', produtoRoutes);
router.use('/', clienteRoutes); 
router.use('/', pedidoRoutes);

module.exports={router};