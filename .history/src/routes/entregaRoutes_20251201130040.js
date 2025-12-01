const express = require("express");
const entregaRoutes = express.Router();

const entregaController = require("../controller/entregaController");

entregaRoutes.post("/calcular", entregaController.calcularEntrega);
entregaRoutes.post("/salcalcula", entregaController.salvarEntrega);


module.exports = {entregaRoutes}
