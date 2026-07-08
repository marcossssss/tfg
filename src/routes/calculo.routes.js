import express from "express";
import { calcularProceso } from "../services/calculadora.service.js";
import { deducirDatos } from "../services/deduccion.service.js";

const router = express.Router();

router.post("/calcular", (req, res) => {
  try {
    const datosCompletos = deducirDatos(req.body);
    const resultado = calcularProceso(datosCompletos);

    res.status(200).json({
      ok: true,
      datosCompletos,
      resultado
    });

  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message
    });
  }
});

export default router;