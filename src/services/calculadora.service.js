import { TIPOS_PROCESO } from "../domain/tiposProceso.js";
import { R } from "../domain/gasIdeal.js";

const CV = 20.8;
const CP = 29.1;

export function calcularProceso(datos) {
  validarDatos(datos);

  const { tipoProceso, moles, estadoInicial, estadoFinal } = datos;

  switch (tipoProceso) {
    case TIPOS_PROCESO.ISOTERMO:
      return calcularIsotermo({ moles, estadoInicial, estadoFinal });

    case TIPOS_PROCESO.ISOBARO:
      return calcularIsobaro({ moles, estadoInicial, estadoFinal });

    case TIPOS_PROCESO.ISOCORO:
      return calcularIsocoro({ moles, estadoInicial, estadoFinal });

    case TIPOS_PROCESO.ADIABATICO:
      return calcularAdiabatico({ moles, estadoInicial, estadoFinal });

    default:
      throw new Error("Tipo de proceso no válido");
  }
}

function calcularIsotermo({ moles, estadoInicial, estadoFinal }) {
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

function calcularIsobaro({ moles, estadoInicial, estadoFinal }) {
  const deltaT = estadoFinal.temperatura - estadoInicial.temperatura;

  const trabajo =
    estadoInicial.presion *
    (estadoFinal.volumen - estadoInicial.volumen);

  return {
    tipoProceso: TIPOS_PROCESO.ISOBARO,
    trabajo,
    calor: moles * CP * deltaT,
    variacionEnergiaInterna: moles * CV * deltaT
  };
}

function calcularIsocoro({ moles, estadoInicial, estadoFinal }) {
  const deltaT = estadoFinal.temperatura - estadoInicial.temperatura;
  const deltaU = moles * CV * deltaT;

  return {
    tipoProceso: TIPOS_PROCESO.ISOCORO,
    trabajo: 0,
    calor: deltaU,
    variacionEnergiaInterna: deltaU
  };
}

function calcularAdiabatico({ moles, estadoInicial, estadoFinal }) {
  const deltaT = estadoFinal.temperatura - estadoInicial.temperatura;
  const deltaU = moles * CV * deltaT;

  return {
    tipoProceso: TIPOS_PROCESO.ADIABATICO,
    trabajo: -deltaU,
    calor: 0,
    variacionEnergiaInterna: deltaU
  };
}

function validarDatos(datos) {
  if (!datos.tipoProceso) throw new Error("Falta el tipo de proceso");
  if (!datos.moles || datos.moles <= 0) throw new Error("Los moles deben ser mayores que 0");
  if (!datos.estadoInicial) throw new Error("Falta el estado inicial");
  if (!datos.estadoFinal) throw new Error("Falta el estado final");
}