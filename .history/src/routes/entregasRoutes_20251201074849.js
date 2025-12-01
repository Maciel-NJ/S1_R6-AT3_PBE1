const express = require("express");
const entregas = express.Router();

const entregaController = require("../controller/entregaController");

router.post("/calcular", entregaController.calcularEntrega);

module.exports = {entregas}
