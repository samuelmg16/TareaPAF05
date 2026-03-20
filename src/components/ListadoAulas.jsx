import Aula from "./Aula";

export default function ListadoAulas({
  aulas,
  borrarAula,
  soloOrdenadores
}) {
    const aulasFiltradas = soloOrdenadores
    ? aulas.filter(aula => aula.esAulaOrdenadores == 1)
    : aulas;
  return (
    <ul>
      {aulasFiltradas.length == 0 ? (
        <li>No hay aulas en la base de datos</li>
      ) : (
        aulasFiltradas.map((aula) => (
          <Aula 
          key={aula.id} 
          aula={aula} 
          borrarAula={borrarAula} 
          />
        ))
      )}
    </ul>
  );
}
