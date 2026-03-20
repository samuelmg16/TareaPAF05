export default function Aula({ aula, borrarAula }) {
  return (
    console.log(aula),
    <li>
      {aula.numeroAula} {aula.esAulaOrdenadores == 1 && "🖥️"} - {aula.comentarios}
      &nbsp;<button onClick={() => borrarAula(aula.id)}>❌</button>
    </li>
  );
}
