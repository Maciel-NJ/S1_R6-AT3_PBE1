const express = require('express');
const router = express.Router();

//Referencio os arquivos de rota que irei trabalhar

const {clienteRoutes} = require('./clienteRoutes');
const {produtoRoutes} = require('./produtoRoutes');  


router.use('/', clienteRoutes); 


module.exports={router};