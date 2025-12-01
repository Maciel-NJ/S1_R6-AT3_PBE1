const express = require("express");
const entregasRoutes = express.Router();

const entregaController = require("../controller/entregaController");

router.post("/calcular", entregaController.calcularEntrega);

module.exports = {entregasR}
