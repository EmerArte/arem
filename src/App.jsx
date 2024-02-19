import { useEffect, useState } from "react";
import { Consultar } from "./components/Consultar";
import { ReservasForm } from "./components/ReservasForm";
import { Button, FlexConainer } from "./components/Styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";
export const App = () => {
  const [page, setPage] = useState(0);
  const getAuth = async () => {
    signInWithEmailAndPassword(auth, "marioblanq2016@gmail.com", "Mario19")
      .then((userCredential) => {
        const user = userCredential.user;
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
  }, []);
  return (
    <FlexConainer direction="column" gap="0px" padding="0px">
      <FlexConainer direction="row" gap="10px" padding="2px">
        <Button onClick={() => setPage(0)}>Reservas</Button>
        <Button onClick={() => setPage(1)}>Consultar</Button>
      </FlexConainer>

      {page === 0 ? <ReservasForm></ReservasForm> : <Consultar></Consultar>}
    </FlexConainer>
  );
};
