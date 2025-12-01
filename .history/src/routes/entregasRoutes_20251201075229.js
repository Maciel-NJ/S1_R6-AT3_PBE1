const express = require("express");
const entregaRoutes = express.Router();

const entregaController = require("../controller/entregaController");

entregasRoutes.post("/calcular", entregaController.calcularEntrega);

module.exports = {entregasRoutes}
