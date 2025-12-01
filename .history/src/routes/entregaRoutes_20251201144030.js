const express = require("express");
const entregaRoutes = express.Router();

const entregaController = require("../controller/entregaController");

entregaRoutes.post("/adicionar", entregaController.adcionarEntrega);


module.exports = {entregaRoutes}