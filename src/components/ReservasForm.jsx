import { useState } from "react";
import { cuentasId, escenarios, horarios } from "../constants";
import {
  Button,
  FlexConainer,
  Form,
  Input,
  Label,
  Select,
  Title,
} from "./Styles";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";

export const ReservasForm = () => {
  const [account, setAccount] = useState(cuentasId[0].id);
  const [escenario, setEscenario] = useState(escenarios[0].id);
  const [horario, setHorario] = useState(horarios[0]);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const onClick = async (event) => {
    event.preventDefault();
    const payload = {
      fecha: fecha,
      categoria: "deportes",
      nombre_escenario: escenarios.find((esc) => esc.id == escenario)?.nombre,
      estado: "Esperando",
      confirmada: false,
      horario: horario,
      email: cuentasId.find((cuenta) => cuenta.id == account)?.correo,
      id_user: account,
      finalizada: false,
      id_esc: escenario,
    };
    const docRef = collection(db, "reservas");
    try {
      await addDoc(docRef, payload);
      alert("Reserva agregada");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FlexConainer cwith="70%" gap="0px" padding="0px">
      <Title>Reservas</Title>
      <Form onSubmit={onClick}>
        <FlexConainer gap="15px" padding="0px" align="start">
          <Label htmlFor="cuentas">Cuentas</Label>
          <Select
            id="cuentas"
            name="cuentas"
            value={account}
            onChange={(e) => {
              setAccount(e.target.value);
            }}
          >
            {cuentasId.map((cuenta) => (
              <option key={self.crypto.randomUUID()} value={cuenta.id}>
                {cuenta.correo}
              </option>
            ))}
          </Select>
          <Label htmlFor="escenarios">Escenarios</Label>
          <Select
            id="escenarios"
            name="escenarios"
            value={escenario}
            onChange={(e) => {
              setEscenario(e.target.value);
            }}
          >
            {escenarios.map((escenario) => (
              <option key={self.crypto.randomUUID()} value={escenario.id}>
                {escenario.nombre}
              </option>
            ))}
          </Select>
          <Label htmlFor="horarios">Horarios</Label>
          <Select
            id="horarios"
            name="horarios"
            value={horario}
            onChange={(e) => {
              setHorario(e.target.value);
            }}
          >
            {horarios.map((horario) => (
              <option key={self.crypto.randomUUID()} value={horario}>
                {horario}
              </option>
            ))}
          </Select>
          <Label htmlFor="fecha">Fecha</Label>
          <Input
            type="date"
            placeholder="yyyy-mm-dd"
            id="fecha"
            name="fecha"
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value);
            }}
          />
          <Button type="submit">Reservar</Button>
        </FlexConainer>
      </Form>
    </FlexConainer>
  );
};
