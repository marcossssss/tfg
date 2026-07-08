document.getElementById("calcularBtn").addEventListener("click", async () => {
  const datos = {
    tipoProceso: document.getElementById("tipoProceso").value,
    moles: Number(document.getElementById("moles").value),
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

  try {
    const respuesta = await fetch("/api/calcular", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    const data = await respuesta.json();

    if (!data.ok) {
      mostrarError(data.error);
      return;
    }

    rellenarCamposDeducidos(datos, data.datosCompletos);
    mostrarResultado(data.resultado);

  } catch (error) {
    mostrarError("Error al conectar con el servidor.");
  }
});

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
    <div>
      <h3>Resultados del proceso</h3>
      <p><strong>Tipo:</strong> ${resultado.tipoProceso}</p>
      <p><strong>Trabajo:</strong> ${resultado.trabajo.toFixed(2)} J</p>
      <p><strong>Calor:</strong> ${resultado.calor.toFixed(2)} J</p>
      <p><strong>Variación de energía interna:</strong> ${resultado.variacionEnergiaInterna.toFixed(2)} J</p>
    </div>
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