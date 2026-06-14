export function crearEstado({ presion, volumen, temperatura }) {
  return {
    presion,
    volumen,
    temperatura
  };
}

export function crearProceso({ tipoProceso, estadoInicial, estadoFinal }) {
  return {
    tipoProceso,
    estadoInicial,
    estadoFinal,
    resultado: null
  };
}

export function crearSimulacion({ nombre, procesos = [] }) {
  return {
    nombre,
    fechaCreacion: new Date(),
    procesos
  };
}