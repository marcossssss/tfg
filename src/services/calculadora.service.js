import { TIPOS_PROCESO } from "../domain/tiposProceso.js";
import { R } from "../domain/gasIdeal.js";

const CV = 20.8;
const CP = 29.1;

export function calcularProceso(datos) {
  validarDatos(datos);

  const { tipoProceso, moles, estadoInicial, estadoFinal } = datos;

  switch (tipoProceso) {
    case TIPOS_PROCESO.ISOTERMO:
      return calcularIsotermo(moles, estadoInicial, estadoFinal);

    case TIPOS_PROCESO.ISOBARO:
      return calcularIsobaro(moles, estadoInicial, estadoFinal);

    case TIPOS_PROCESO.ISOCORO:
      return calcularIsocoro(moles, estadoInicial, estadoFinal);

    case TIPOS_PROCESO.ADIABATICO:
      return calcularAdiabatico(moles, estadoInicial, estadoFinal);

    default:
      throw new Error("Tipo de proceso no válido");
  }
}

function calcularIsotermo(moles, estadoInicial, estadoFinal) {
  const trabajo =
    moles *
    R *
    estadoInicial.temperatura *
    Math.log(estadoFinal.volumen / estadoInicial.volumen);

  return {
    tipoProceso: TIPOS_PROCESO.ISOTERMO,
    trabajo,
    calor: trabajo,
    variacionEnergiaInterna: 0
  };
}

function calcularIsobaro(moles, estadoInicial, estadoFinal) {
  const deltaT = estadoFinal.temperatura - estadoInicial.temperatura;

  const trabajo =
    estadoInicial.presion *
    (estadoFinal.volumen - estadoInicial.volumen);

  const variacionEnergiaInterna = moles * CV * deltaT;
  const calor = moles * CP * deltaT;

  return {
    tipoProceso: TIPOS_PROCESO.ISOBARO,
    trabajo,
    calor,
    variacionEnergiaInterna
  };
}

function calcularIsocoro(moles, estadoInicial, estadoFinal) {
  const deltaT = estadoFinal.temperatura - estadoInicial.temperatura;

  const trabajo = 0;
  const variacionEnergiaInterna = moles * CV * deltaT;
  const calor = variacionEnergiaInterna;

  return {
    tipoProceso: TIPOS_PROCESO.ISOCORO,
    trabajo,
    calor,
    variacionEnergiaInterna
  };
}

function calcularAdiabatico(moles, estadoInicial, estadoFinal) {
  const deltaT = estadoFinal.temperatura - estadoInicial.temperatura;

  const calor = 0;
  const variacionEnergiaInterna = moles * CV * deltaT;
  const trabajo = -variacionEnergiaInterna;

  return {
    tipoProceso: TIPOS_PROCESO.ADIABATICO,
    trabajo,
    calor,
    variacionEnergiaInterna
  };
}

function validarDatos(datos) {
  if (!datos) {
    throw new Error("No se han enviado datos");
  }

  if (!datos.tipoProceso) {
    throw new Error("Falta el tipo de proceso");
  }

  if (!datos.moles || datos.moles <= 0) {
    throw new Error("Los moles deben ser mayores que 0");
  }

  if (!datos.estadoInicial) {
    throw new Error("Falta el estado inicial");
  }

  if (!datos.estadoFinal) {
    throw new Error("Falta el estado final");
  }

  validarEstado(datos.estadoInicial, "estado inicial");
  validarEstado(datos.estadoFinal, "estado final");
}

function validarEstado(estado, nombre) {
  if (estado.presion === undefined) {
    throw new Error(`Falta la presión en el ${nombre}`);
  }

  if (estado.volumen === undefined || estado.volumen <= 0) {
    throw new Error(`El volumen del ${nombre} debe ser mayor que 0`);
  }

  if (estado.temperatura === undefined || estado.temperatura <= 0) {
    throw new Error(`La temperatura del ${nombre} debe ser mayor que 0`);
  }
}