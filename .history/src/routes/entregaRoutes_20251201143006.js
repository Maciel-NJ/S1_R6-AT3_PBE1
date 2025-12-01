const express = require("express");
const entregaRoutes = express.Router();

const entregaController = require("../controller/entregaController");

entregaRoutes.post("/calcular", entregaController.);


module.exports = {entregaRoutes}