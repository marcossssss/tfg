document.getElementById("calcularBtn").addEventListener("click", async () => {
  const datos = {
    tipoProceso: document.getElementById("tipoProceso").value,
    moles: Number(document.getElementById("moles").value),
    estadoInicial: {
      presion: Number(document.getElementById("p1").value),
      volumen: Number(document.getElementById("v1").value),
      temperatura: Number(document.getElementById("t1").value)
    },
    estadoFinal: {
      presion: Number(document.getElementById("p2").value),
      volumen: Number(document.getElementById("v2").value),
      temperatura: Number(document.getElementById("t2").value)
    }
  };

  try {
    const respuesta = await fetch("/api/calcular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();

    document.getElementById("resultado").textContent =
      JSON.stringify(resultado, null, 2);

  } catch (error) {
    document.getElementById("resultado").textContent =
      "Error al conectar con el servidor.";
  }
});