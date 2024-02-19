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
import { db } from "./firebase.config";

export const addReserva = async (reserva) => {
  const docRef = collection(db, "reservas");
  try {
    await addDoc(docRef, reserva);
    alert("Reserva agregada");
  } catch (error) {
    console.log(error);
  }
};
export const getEscenarios = async () => {
  const docRef = collection(db, "escenarios");
  const data = query(docRef);
  const querySnapshot = await getDocs(data);
  const escenarios = [];
  querySnapshot.forEach((doc) => {
    escenarios.push({ id: doc.id, ...doc.data() });
  });
  return escenarios;
};
export const getReservasByEsenarioAndFecha = async ({ escenarioId, fecha }) => {
  console.log(escenarioId, fecha);
  const docRef = collection(db, "reservas");
  const data = query(
    docRef,
    and(where("id_esc", "==", escenarioId), where("fecha", "==", fecha))
  );
  const querySnapshot = await getDocs(data);
  const reservas = [];
  querySnapshot.forEach((doc) => {
    reservas.push({ id: doc.id, ...doc.data() });
  });
  return reservas;
};
export const atenderReserva = async (reservaId) => {
  const docRef = collection(db, "reservas");
  try {
    await updateDoc(doc(docRef, reservaId), {
      estado: "Atendido",
    });
    alert("Reserva actualizada");
  } catch (error) {
    console.log(error);
  }
};
export const getReservasByEmail = async (email) => {
  const docRef = collection(db, "reservas");
  const data = query(docRef, where("email", "==", email));
  const querySnapshot = await getDocs(data);
  const reservas = [];
  querySnapshot.forEach((doc) => {
    reservas.push({ id: doc.id, ...doc.data() });
  });
  return reservas;
};
export const eliminarReserva = async (reservaId) => {
  const docRef = collection(db, "reservas");
  try {
    await deleteDoc(doc(docRef, reservaId));
    alert("Reserva eliminada");
  } catch (error) {
    console.log(error);
  }
};
