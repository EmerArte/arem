import {
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "./firebase.config";
import { useEffect, useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ReservasForm } from "./components/ReservasFomr";
export const App = () => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null);
  const userId = useRef(null);
  const fecha = useRef(null);
  const fechaReserva = useRef(null);
  const email = useRef(null);
  const id = useRef(null);
  const reservaId = useRef(null);
  const updateReservaId = useRef(null);

  const updateReserva = async (event) => {
    event.preventDefault();
    const docRef = collection(db, "reservas");
    try {
      await updateDoc(doc(docRef, updateReservaId.current.value), {
        estado: "Atendido",
      });
      alert("Reserva actualizada");
    } catch (error) {
      console.log(error);
    }
  };
  const consultarIdUsuario = async (event) => {
    event.preventDefault();
    const docRef = collection(db, "reservas");
    const data = query(docRef, where("email", "==", email.current.value));
    const querySnapshot = await getDocs(data);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      // doc.data() is never undefined for query doc snapshots
    });
  };
  const consultaReservasPorId = async (event) => {
    event.preventDefault();
    const docRef = collection(db, "reservas");
    const data = query(docRef, where("id_user", "==", userId.current.value));
    const querySnapshot = await getDocs(data);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  const consultaUsuariosPorId = async (event) => {
    event.preventDefault();
    const docRef = collection(db, "usuarios");
    const data = query(docRef, where("email", "==", id.current.value));
    const querySnapshot = await getDocs(data);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
    });
  };
  const consultaReservasPorfecha = async (event) => {
    event.preventDefault();
    const docRef = collection(db, "reservas");
    const data = query(
      docRef,
      and(
        where("id_esc", "==", "TCdUVRK4S8W313qcroD9"),
        //where("id_esc", "==", "lQl4WWeOQEjHY6JGV1Iw"),
        where("fecha", "==", fechaReserva.current.value)
      )
    );
    const querySnapshot = await getDocs(data);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id + "==>", doc.data());
    });
  };

  const eliminarReserva = async (event) => {
    event.preventDefault();
    const docRef = collection(db, "reservas");
    try {
      await deleteDoc(doc(docRef, reservaId.current.value));
      alert("Reserva eliminada");
    } catch (error) {
      console.log(error);
    }
  };

  const createReserva = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "reservas"), {
      fecha: fecha.current.value,
      categoria: "deportes",
      nombre_escenario:
        "Cancha de fútbol 10 unidad recreo deportiva de la Villa Occidente",
      estado: "Esperando",
      confirmada: false,
      horario: "HORARIO DE 20:00 - 21:00",
      email: "erick.villa.olimpica@gmail.com",
      id_user: "m0ltyVsxnVS11nSlhqlDrEQ2PfG3",
      finalizada: false,
      id_esc: "TCdUVRK4S8W313qcroD9",
    });
    alert("Document written with ID: ", docRef.id);
  };
  // cuenta arteaga emer = GnwCTSJS24ZGHQjq0UIXtmXhaw72
  // cuenta yurany P43M0D4JU4di258kNTnwQSzuEJ13
  /*
  "Cancha de vóleibol playa unidad recreo deportiva de la Villa Occidente"
  {
    "finalizada": false,
    "nombre_escenario": "Cancha de fútbol 10 unidad recreo deportiva de la Villa Occidente",
    "fecha": "2023-12-16",
    "horario": "HORARIO DE 18:00 - 19:00",
    "categoria": "deportes",
    "email": "marioblanq2016@gmail.com",
    "confirmada": false,
    "id_user": "uIKkA2i1v4WlWDq4eRknSe5bmD23",
    "id_esc": "TCdUVRK4S8W313qcroD9",
    "estado": "Atendido"
}
  */
  // cuenta perci wqnMTwuowkcWZikuob27A5hTyd82
  // cuenta victor hisoydaniel19@gmail.com EuScUcyfMMN4tct9oITimqfUCUT2
  // cuenta mario uIKkA2i1v4WlWDq4eRknSe5bmD23 marioblanq2016@gmail.com
  // cuenta aimar lIFfG7zWSBVOTPUHao50sCzxyV62 aditheran2000@gmail.com
  // aimar 2  BJz0ptX3rkWueUeBpiwg7z0COIn2 andrestm585@gmail.com
  // aimar 3 m0ltyVsxnVS11nSlhqlDrEQ2PfG3 erick.villa.olimpica@gmail.com
  const getAuth = async () => {
    signInWithEmailAndPassword(auth, "marioblanq2016@gmail.com", "Mario19")
      .then((userCredential) => {
        const user = userCredential.user;
        setUserData(user);
        console.log(user);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onLoad = async () => {
    await getAuth();
  };

  useEffect(() => {
    onLoad();
    //getEscenarios();
    //fetchPost();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h1>Todo App</h1>
      <ReservasForm></ReservasForm>
      <br />
      <br />
      <form onSubmit={consultaReservasPorId}>
        <input ref={userId} type="text" placeholder="userId" />
        <button type="submit">consultar</button>
      </form>
      <form onSubmit={consultaReservasPorfecha}>
        <input ref={fechaReserva} type="text" placeholder="yyyy-MM-dd" />
        <button type="submit">consultar</button>
      </form>
      <br />
      <form onSubmit={eliminarReserva}>
        <input ref={reservaId} type="text" placeholder="Reserva id" />
        <button type="submit">eliminar reserva</button>
      </form>
      <br />
      <form onSubmit={createReserva}>
        <label>Crear reserva por fecha</label>
        <input ref={fecha} type="text" placeholder="yyyy-MM-dd" />
        <button type="submit">crear</button>
      </form>
      <br />
      <form onSubmit={consultarIdUsuario}>
        <label>Consultar id por Email</label>
        <input ref={email} type="email" placeholder="email" />
        <button type="submit">consultar</button>
      </form>
      <br />
      <form onSubmit={consultaUsuariosPorId}>
        <label>Consultar datos usuario</label>
        <input ref={id} type="text" placeholder="user_id" />
        <button type="submit">consultar</button>
      </form>
      <br />
      <form onSubmit={updateReserva}>
        <label>Atendido</label>
        <input ref={updateReservaId} type="text" placeholder="reserva id" />
        <button type="submit">actualizar</button>
      </form>
    </div>
  );
};
