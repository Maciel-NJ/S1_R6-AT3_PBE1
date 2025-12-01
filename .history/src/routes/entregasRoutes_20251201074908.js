const express = require("express");
const entregasRoutes = express.Router();

const entregaController = require("../controller/entregaController");

entregasRoutes.post("/calcular", entregaController.calcularEntrega);

module.exports = {entregasRoutes}
