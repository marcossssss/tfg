import express from "express";
import { ejecutarSimulacion } from "../services/simulacion.service.js";

const router = express.Router();

router.post("/simulacion", (req, res) => {

  try {

    const resultado =
      ejecutarSimulacion(req.body);

    res.json(resultado);

  } catch (error) {

    res.status(400).json({
      error: error.message
    });

  }

});

export default router;