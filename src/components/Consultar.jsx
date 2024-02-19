import { useEffect, useState } from "react";
import { FlexConainer, Input, Label, Select, Table, Title } from "./Styles";
import { escenarios } from "../constants";
import {
  atenderReserva,
  eliminarReserva,
  getReservasByEsenarioAndFecha,
} from "../utils";

export const Consultar = () => {
  const [reservas, setReservas] = useState([]);
  const [escenario, setEscenario] = useState(escenarios[0].id);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);

  const getReservasFunction = async () => {
    const res = await getReservasByEsenarioAndFecha({
      escenarioId: escenario,
      fecha,
    });
    console.log(res);
    setReservas(res);
  };
  useEffect(() => {
    getReservasFunction();
  }, [escenario, fecha]);

  return (
    <FlexConainer direction="column">
      <Title>Consultar</Title>
      <FlexConainer direction="column">
        <form>
          <Label>Escenario</Label>
          <Select
            id="escenario"
            name="escenario"
            value={escenario}
            onChange={(e) => {
              setEscenario(e.target.value);
            }}
            required
          >
            {escenarios.map((escenario) => (
              <option key={escenario.id} value={escenario.id}>
                {escenario.nombre}
              </option>
            ))}
          </Select>
          <Label>Fecha</Label>
          <Input
            type="date"
            id="fecha"
            name="fecha"
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value);
            }}
            required
          />
        </form>
      </FlexConainer>
      <Table style={{ display: "block", padding: "10px" }}>
        <thead>
          <tr>
            <th>id</th>
            <th>Escenario</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Usuario</th>
            <th>estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.nombre_escenario}</td>
              <td>{reserva.fecha}</td>
              <td>{reserva.horario}</td>
              <td>{reserva.email}</td>
              <td>{reserva.estado}</td>
              <td>
                <button onClick={() => eliminarReserva(reserva.id)}>
                  Eliminar
                </button>
                <button onClick={() => atenderReserva(reserva.id)}>
                  atendido
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </FlexConainer>
  );
};
