let procesosSimulacion = [];

document.getElementById("calcularBtn").addEventListener("click", async () => {
  const data = await calcularProcesoActual();

  if (!data) return;

  rellenarCamposDeducidos(leerDatosFormulario(), data.datosCompletos);
  mostrarResultado(data.resultado);
});

document.getElementById("agregarProcesoBtn").addEventListener("click", async () => {
  const data = await calcularProcesoActual();

  if (!data) return;

  procesosSimulacion.push(data.datosCompletos);
  rellenarCamposDeducidos(leerDatosFormulario(), data.datosCompletos);
  mostrarResultado(data.resultado);
  actualizarListaProcesos();
});

document.getElementById("ejecutarSimulacionBtn").addEventListener("click", async () => {
  if (procesosSimulacion.length === 0) {
    mostrarError("No hay procesos añadidos a la simulación.");
    return;
  }

  try {
    const respuesta = await fetch("/api/simulacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: "Simulación web",
        procesos: procesosSimulacion
      })
    });

    const data = await respuesta.json();

    if (data.error) {
      mostrarError(data.error);
      return;
    }

    mostrarResultadoSimulacion(data);

  } catch (error) {
    mostrarError("Error al ejecutar la simulación.");
  }
});

async function calcularProcesoActual() {
  try {
    const datos = leerDatosFormulario();

    const respuesta = await fetch("/api/calcular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    const data = await respuesta.json();

    if (!data.ok) {
      mostrarError(data.error);
      return null;
    }

    return data;

  } catch (error) {
    mostrarError("Error al conectar con el servidor.");
    return null;
  }
}

function leerDatosFormulario() {
  return {
    tipoProceso: document.getElementById("tipoProceso").value,
    moles: leerNumero("moles"),
    estadoInicial: {
      presion: leerNumero("p1"),
      volumen: leerNumero("v1"),
      temperatura: leerNumero("t1")
    },
    estadoFinal: {
      presion: leerNumero("p2"),
      volumen: leerNumero("v2"),
      temperatura: leerNumero("t2")
    }
  };
}

function leerNumero(id) {
  const valor = document.getElementById(id).value;
  return valor === "" ? undefined : Number(valor);
}

function mostrarError(mensaje) {
  document.getElementById("resultado").innerHTML = `
    <p style="color: red; font-weight: bold;">${mensaje}</p>
  `;
}

function mostrarResultado(resultado) {
  document.getElementById("resultado").innerHTML = `
    <h3>Resultados del proceso</h3>
    <p><strong>Tipo:</strong> ${resultado.tipoProceso}</p>
    <p><strong>Trabajo:</strong> ${resultado.trabajo.toFixed(2)} J</p>
    <p><strong>Calor:</strong> ${resultado.calor.toFixed(2)} J</p>
    <p><strong>Variación energía interna:</strong> ${resultado.variacionEnergiaInterna.toFixed(2)} J</p>
  `;
}

function actualizarListaProcesos() {
  const lista = document.getElementById("listaProcesos");

  lista.innerHTML = "";

  procesosSimulacion.forEach((proceso, index) => {
    const item = document.createElement("li");
    item.textContent = `Proceso ${index + 1}: ${proceso.tipoProceso}`;
    lista.appendChild(item);
  });
}

function mostrarResultadoSimulacion(simulacion) {
  const contenedor = document.getElementById("resultadoSimulacion");

  let trabajoTotal = 0;
  let calorTotal = 0;
  let energiaTotal = 0;

  simulacion.resultados.forEach(resultado => {
    trabajoTotal += resultado.trabajo;
    calorTotal += resultado.calor;
    energiaTotal += resultado.variacionEnergiaInterna;
  });

  contenedor.innerHTML = `
    <h3>Resultado de la simulación</h3>
    <p><strong>Número de procesos:</strong> ${simulacion.numeroProcesos}</p>
    <p><strong>Trabajo total:</strong> ${trabajoTotal.toFixed(2)} J</p>
    <p><strong>Calor total:</strong> ${calorTotal.toFixed(2)} J</p>
    <p><strong>ΔU total:</strong> ${energiaTotal.toFixed(2)} J</p>
  `;
}

function rellenarCamposDeducidos(original, completos) {
  actualizarCampo("p1", original.estadoInicial.presion, completos.estadoInicial.presion);
  actualizarCampo("v1", original.estadoInicial.volumen, completos.estadoInicial.volumen);
  actualizarCampo("t1", original.estadoInicial.temperatura, completos.estadoInicial.temperatura);

  actualizarCampo("p2", original.estadoFinal.presion, completos.estadoFinal.presion);
  actualizarCampo("v2", original.estadoFinal.volumen, completos.estadoFinal.volumen);
  actualizarCampo("t2", original.estadoFinal.temperatura, completos.estadoFinal.temperatura);
}

function actualizarCampo(id, valorOriginal, valorCompleto) {
  const campo = document.getElementById(id);

  if (valorOriginal === undefined && valorCompleto !== undefined) {
    campo.value = Number(valorCompleto.toFixed(4));
    campo.style.backgroundColor = "#fff3cd";
    campo.title = "Dato deducido automáticamente";
  } else {
    campo.style.backgroundColor = "";
    campo.title = "";
  }
}