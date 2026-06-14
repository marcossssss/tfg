import express from "express";
import { calcularProceso } from "../services/calculadora.service.js";

const router = express.Router();

router.post("/calcular", (req, res) => {
  try {
    const resultado = calcularProceso(req.body);

    res.status(200).json({
      ok: true,
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