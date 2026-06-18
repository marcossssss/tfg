import { calcularProceso } from "./calculadora.service.js";

export function ejecutarSimulacion(simulacion) {

  const resultados = simulacion.procesos.map(proceso => {
    return calcularProceso(proceso);
  });

  return {
    nombre: simulacion.nombre,
    fechaCreacion: simulacion.fechaCreacion,
    numeroProcesos: simulacion.procesos.length,
    resultados
  };
}