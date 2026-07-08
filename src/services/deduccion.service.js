import { R } from "../domain/gasIdeal.js";

function esNumero(valor) {
  return valor !== undefined && valor !== null && !Number.isNaN(valor) && valor > 0;
}

function completarEstado(estado, moles) {
  const { presion, volumen, temperatura } = estado;

  const tieneP = esNumero(presion);
  const tieneV = esNumero(volumen);
  const tieneT = esNumero(temperatura);

  const cantidadDatos = [tieneP, tieneV, tieneT].filter(Boolean).length;

  if (cantidadDatos < 2) {
    return estado;
  }

  if (!tieneP) {
    estado.presion = (moles * R * temperatura) / volumen;
  }

  if (!tieneV) {
    estado.volumen = (moles * R * temperatura) / presion;
  }

  if (!tieneT) {
    estado.temperatura = (presion * volumen) / (moles * R);
  }

  return estado;
}

function aplicarCondicionProceso(datos) {
  const { tipoProceso, estadoInicial, estadoFinal } = datos;

  if (tipoProceso === "ISOTERMO") {
    if (esNumero(estadoInicial.temperatura) && !esNumero(estadoFinal.temperatura)) {
      estadoFinal.temperatura = estadoInicial.temperatura;
    }

    if (!esNumero(estadoInicial.temperatura) && esNumero(estadoFinal.temperatura)) {
      estadoInicial.temperatura = estadoFinal.temperatura;
    }
  }

  if (tipoProceso === "ISOBARO") {
    if (esNumero(estadoInicial.presion) && !esNumero(estadoFinal.presion)) {
      estadoFinal.presion = estadoInicial.presion;
    }

    if (!esNumero(estadoInicial.presion) && esNumero(estadoFinal.presion)) {
      estadoInicial.presion = estadoFinal.presion;
    }
  }

  if (tipoProceso === "ISOCORO") {
    if (esNumero(estadoInicial.volumen) && !esNumero(estadoFinal.volumen)) {
      estadoFinal.volumen = estadoInicial.volumen;
    }

    if (!esNumero(estadoInicial.volumen) && esNumero(estadoFinal.volumen)) {
      estadoInicial.volumen = estadoFinal.volumen;
    }
  }

  return datos;
}

function validarProcesoCompleto(datos) {
  const camposFaltantes = [];

  const { estadoInicial, estadoFinal } = datos;

  if (!esNumero(datos.moles)) camposFaltantes.push("moles");

  if (!esNumero(estadoInicial.presion)) camposFaltantes.push("presión inicial");
  if (!esNumero(estadoInicial.volumen)) camposFaltantes.push("volumen inicial");
  if (!esNumero(estadoInicial.temperatura)) camposFaltantes.push("temperatura inicial");

  if (!esNumero(estadoFinal.presion)) camposFaltantes.push("presión final");
  if (!esNumero(estadoFinal.volumen)) camposFaltantes.push("volumen final");
  if (!esNumero(estadoFinal.temperatura)) camposFaltantes.push("temperatura final");

  if (camposFaltantes.length > 0) {
    throw new Error(
      `Información insuficiente. Introduce alguno de los siguientes datos: ${camposFaltantes.join(", ")}.`
    );
  }
}

export function deducirDatos(datos) {
  const proceso = structuredClone(datos);

  proceso.estadoInicial = completarEstado(proceso.estadoInicial, proceso.moles);
  proceso.estadoFinal = completarEstado(proceso.estadoFinal, proceso.moles);

  aplicarCondicionProceso(proceso);

  proceso.estadoInicial = completarEstado(proceso.estadoInicial, proceso.moles);
  proceso.estadoFinal = completarEstado(proceso.estadoFinal, proceso.moles);

  validarProcesoCompleto(proceso);

  return proceso;
}