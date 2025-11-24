const express = require('express');
const router = express.Router();

//Referencio os arquivos de rota que irei trabalhar

const {clienteRoutes} = require('./clienteRoutes');  



router.use('/', produtoRoutes);
router.use('/', clienteRoutes); 
router.use('/', pedidoRoutes);

module.exports={router};