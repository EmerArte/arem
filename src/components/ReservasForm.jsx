import { useState } from "react";
import { cuentasId, escenarios, horarios } from "../constants";

export const ReservasForm = () => {
  const [account, setAccount] = useState("");
  const [escenario, setEscenario] = useState("");
  const [horario, setHorario] = useState("");
  const [fecha, setFecha] = useState("");

  const onClick = async (event) => {
    event.preventDefault();
    const payload = {
      fecha: fecha,
      categoria: "deportes",
      nombre_escenario: escenarios.find((esc) => esc.id === escenario).nombre,
      estado: "Esperando",
      confirmada: false,
      horario: horario,
      email: cuentasId.find((cuenta) => cuenta.id === account).correo,
      id_user: account,
      finalizada: false,
      id_esc: escenario,
    };
    console.log(payload);
    //const docRef = await addDoc(collection(db, "reservas"), payload);
    console.log("Reservar");
  };
  return (
    <form
      onSubmit={onClick}
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          width: "100%",
          height: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <label htmlFor="cuentas">Cuentas</label>
        <select
          id="cuentas"
          name="cuentas"
          value={account}
          onChange={(e) => {
            e.preventDefault();
            setAccount(e.target.value);
          }}
        >
          {cuentasId.map((cuenta) => (
            <option key={self.crypto.randomUUID()} value={cuenta.id}>
              {cuenta.correo}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          width: "100%",
          height: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <label htmlFor="escenarios">Escenarios</label>
        <select
          id="escenarios"
          name="escenarios"
          value={escenario}
          onChange={(e) => {
            e.preventDefault();
            setEscenario(e.target.value);
          }}
        >
          {escenarios.map((escenario) => (
            <option key={self.crypto.randomUUID()} value={escenario.id}>
              {escenario.nombre}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          width: "100%",
          height: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <label htmlFor="horarios">Horarios</label>
        <select
          id="horarios"
          name="horarios"
          value={horario}
          onChange={(e) => {
            e.preventDefault();
            setHorario(e.target.value);
          }}
        >
          {horarios.map((horario) => (
            <option key={self.crypto.randomUUID()} value={horario}>
              {horario}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          width: "50%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <label
          htmlFor="fecha"
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Fecha
        </label>
        <input
          type="text"
          placeholder="yyyy-mm-dd"
          id="fecha"
          name="fecha"
          value={fecha}
          style={{
            width: "100%",
            outline: "none",
            border: "1px solid black",
            borderRadius: "5px",
            height: "24px",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "600",
            color: "black",
          }}
          onChange={(e) => {
            e.preventDefault();
            setFecha(e.target.value);
          }}
        />
      </div>
      <button type="submit">Reservar</button>
    </form>
  );
};
