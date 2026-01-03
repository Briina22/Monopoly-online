const peones = document.querySelectorAll(".peon");
const botonUnirse = document.getElementById("unirse");
const botonIniciar = document.getElementById("iniciar");
const lista = document.getElementById("lista-jugadores");
const contador = document.getElementById("contador");
const estado = document.getElementById("estado");
const nombreInput = document.getElementById("nombre");

let peonSeleccionado = null;
let jugadores = [];

// Selección de peón
peones.forEach(peon => {
  peon.addEventListener("click", () => {
    peones.forEach(p => p.classList.remove("seleccionado"));
    peon.classList.add("seleccionado");
    peonSeleccionado = peon.textContent;
  });
});

// Unirse a la partida
botonUnirse.addEventListener("click", () => {
  if (jugadores.length >= 6) {
    alert("La partida está llena");
    return;
  }

  const nombre = nombreInput.value.trim();

  if (!nombre || !peonSeleccionado) {
    alert("Ingresá un nombre y elegí un peón");
    return;
  }

  jugadores.push({
    nombre: nombre,
    peon: peonSeleccionado
  });

  actualizarLobby();

  // Reset formulario
  nombreInput.value = "";
  peonSeleccionado = null;
  peones.forEach(p => p.classList.remove("seleccionado"));
});

// Iniciar partida
botonIniciar.addEventListener("click", () => {
  estado.textContent = "🎲 ¡La partida ha comenzado!";
  botonIniciar.disabled = true;
  botonUnirse.disabled = true;
});

// Actualizar lobby
function actualizarLobby() {
  lista.innerHTML = "";

  jugadores.forEach(jugador => {
    const li = document.createElement("li");
    li.textContent = `${jugador.peon} ${jugador.nombre}`;
    lista.appendChild(li);
  });

  contador.textContent = `Jugadores: ${jugadores.length} / 6`;

  // Activar iniciar con mínimo 2 jugadores
  botonIniciar.disabled = jugadores.length < 2;
}
