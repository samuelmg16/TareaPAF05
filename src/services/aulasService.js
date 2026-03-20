const BASE_URL = "http://localhost:8080/api/aulas";

export async function getAulas() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al obtener aulas");
  return res.json();
}

export async function getCentros() {
  const res = await fetch("http://localhost:8080/api/centros");
  if (!res.ok) throw new Error("Error al obtener centros");
  return res.json();
}

export async function crearAula(numeroAula, comentarios, esAulaOrdenadores) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({  numeroAula: numeroAula, comentarios: comentarios, esAulaOrdenadores: esAulaOrdenadores }),
  });
  if (!res.ok) throw new Error("Error al crear tarea");
  return res.json();
}

export async function eliminarAula(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar aula");
}
/*
export async function completarTarea(id) {
  const res = await fetch(`${BASE_URL}/${id}/finalizar`, { method: "PUT" });
  if (!res.ok) throw new Error("Error al completar tarea");
  return res.json();
}

export async function descompletarTarea(id) {
  const res = await fetch(`${BASE_URL}/${id}/descompletar`, { method: "PATCH" });
  if (!res.ok) throw new Error("Error al descompletar tarea");
  return res.json();
}
*/