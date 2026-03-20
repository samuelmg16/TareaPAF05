import { useState, useEffect } from "react";
import FormularioAula from "./components/FormularioAula";
import ListadoAulas from "./components/ListadoAulas";
import {
  getAulas,
  eliminarAula,
  crearAula,
  getCentros
} from "./services/aulasService";

function App() {
  const [centros, setCentros] = useState([]);
  const [listadoAulas, setListadoAulas] = useState([]);
  const [nuevaAula, setNuevaAula] = useState(
    {
      numeroAula: "",
      comentarios: "",
      esAulaOrdenadores: false,
      centro: ""
    }
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado del servidor: puede ser "" (sin actividad), "guardando" o "guardado"
  const [estadoServidor, setEstadoServidor] = useState("");
  const [soloOrdenadores, setSoloOrdenadores] = useState(false);

  // Helpers para cambiar el estado del servidor antes y después de cada operación
  function iniciarGuardado() {
    setEstadoServidor("guardando");
  }

  function finalizarGuardado() {
    setEstadoServidor("guardado");
    // Después de 1 segundo, limpiamos el mensaje automáticamente
    setTimeout(() => setEstadoServidor(""), 1000);
  }

  // Funciones para ordenar el listado de aulas por número de aula
  function ordenarAsc() {
    const ordenadas = [...listadoAulas].sort(
      (a, b) => a.numeroAula - b.numeroAula,
    );
    setListadoAulas(ordenadas);
  }

  function ordenarDesc() {
    const ordenadas = [...listadoAulas].sort(
      (a, b) => b.numeroAula - a.numeroAula,
    );
    setListadoAulas(ordenadas);
  }

  // useEffect se ejecuta una sola vez al cargar el componente (el [] vacío lo indica)
  // Llama a la API para obtener todas las tareas y guardarlas en el estado
  useEffect(() => {
    getAulas()
      .then((aulas) => setListadoAulas(aulas))
      .catch(() => setError("No se pudo conectar con el servidor"))
      .finally(() => setLoading(false));
  }, []);

  // Igual pero para centros
  useEffect(() => {
    getCentros()
      .then((centros) => setCentros(centros))
      .catch(() => setError("No se pudo conectar con el servidor"))
      .finally(() => setLoading(false));
  }, []);

  async function borrarAula(id) {
    iniciarGuardado();
    await eliminarAula(id); // Llama a la API para eliminar la aula y espera a que termine
    setListadoAulas(listadoAulas.filter((aula) => aula.id !== id)); // Actualiza el estado local eliminando la aula, react renderizará de nuevo el componente con la lista actualizada
    finalizarGuardado();
  }

  async function agregarAula(e) {
    e.preventDefault();
    iniciarGuardado();
    const tareaCreada = await crearAula(
      nuevaAula.numeroAula,
      nuevaAula.comentarios,
      nuevaAula.esAulaOrdenadores,
      nuevaAula.centro
    );
    setListadoAulas([...listadoAulas, tareaCreada]);
    setNuevaAula({
      numeroAula: "",
      comentarios: "",
      esAulaOrdenadores: false,
      centro: ""
    });
    finalizarGuardado();
  }

  return (
    <>
      <h1>Listado de Aulas</h1>
      <div>
        <h3>Ordenar por número de aula:</h3>
        <button onClick={() => ordenarAsc()}>Ascendente</button>
        &nbsp;
        <button onClick={() => ordenarDesc()}>Descendente</button>
      </div>

      <div>
        <h3>Mostrar todas las aulas o solo con ordenadores</h3>
        <button onClick={() => setSoloOrdenadores(!soloOrdenadores)}>
          {soloOrdenadores ? "Mostrar todas" : "Solo ordenadores"}
        </button>
      </div>

      {loading && <p>Cargando aulas...</p>}
      {error && <p>{error}</p>}

      {estadoServidor === "guardando" && <p>Guardando cambios...</p>}
      {estadoServidor === "guardado" && <p>✓ Cambios guardados</p>}

      <ListadoAulas aulas={listadoAulas} borrarAula={borrarAula} soloOrdenadores={soloOrdenadores}/>
      <FormularioAula
        agregarAula={agregarAula}
        nuevaAula={nuevaAula}
        setNuevaAula={setNuevaAula}
        centros={centros}
      />
    </>
  );
}

export default App
