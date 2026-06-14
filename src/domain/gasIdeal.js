export const R = 8.314;

export function calcularPresionGasIdeal({ moles, volumen, temperatura }) {
  return (moles * R * temperatura) / volumen;
}

export function calcularVolumenGasIdeal({ moles, temperatura, presion }) {
  return (moles * R * temperatura) / presion;
}

export function calcularTemperaturaGasIdeal({ presion, volumen, moles }) {
  return (presion * volumen) / (moles * R);
}