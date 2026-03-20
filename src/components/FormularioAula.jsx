export default function FormularioAula({
  agregarAula,
  nuevaAula,
  setNuevaAula,
  centros
}) {
  return (
    <form onSubmit={agregarAula}>
      <input
        required
        type="number"
        placeholder="Número de aula"
        value={nuevaAula.numeroAula}
        onChange={(e) =>
          setNuevaAula({ ...nuevaAula, numeroAula: e.target.value })
        }
      />
      &nbsp;
      <input
        required
        type="text"
        placeholder="Comentarios"
        value={nuevaAula.comentarios}
        onChange={(e) =>
          setNuevaAula({ ...nuevaAula, comentarios: e.target.value })
        }
      />
      &nbsp;
      <label>
        <input
          type="checkbox"
          checked={nuevaAula.esAulaOrdenadores}
          onChange={(e) =>
            setNuevaAula({
              ...nuevaAula,
              esAulaOrdenadores: e.target.checked,
            })
          }
        />
        Es aula de ordenadores
      </label>
      <select
        required
        value={nuevaAula.centro}
        onChange={(e) =>
          setNuevaAula({ ...nuevaAula, centro: e.target.value })
        }
      >
        <option value="">Selecciona un centro</option>
        {centros.map((centro) => (
          <option key={centro.id} value={centro.id}>
            {centro.nombre}
          </option>
        ))}
      </select>
      &nbsp;
      <button type="submit">Agregar</button>
    </form>
  );
}
