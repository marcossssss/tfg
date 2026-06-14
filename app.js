import calculoRoutes from "./src/routes/calculo.routes.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", calculoRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API TermoSim funcionando correctamente"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});