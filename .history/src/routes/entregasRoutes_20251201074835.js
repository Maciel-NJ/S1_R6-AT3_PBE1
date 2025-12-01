const express = require("express");
const router = express.Router();

const entregaController = require("../controller/entregaController");

router.post("/calcular", entregaController.calcularEntrega);

module.exports = {entregas}
