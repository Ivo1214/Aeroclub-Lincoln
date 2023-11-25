import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailSignIn } from "../../atomos/atoms";

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { fetchAPIAuthToken } from "../../api/apiCalls";
import { useAuthToken } from "../../hooks/useAuthToken";
import Swal from "sweetalert2";
import "./login-google.css";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const clientId = import.meta.env.VITE_CLIENT_ID;
//const clientId ="757917448675-e4ek8n24frkil8f7s8infc1ufdsq8nmg.apps.googleusercontent.com";

function LoginGoogle() {
  const { decodificarToken } = useAuthToken();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  //este recoil es un estado global para transmitir el email
  const [email, setEmail] = useRecoilState(emailSignIn);

  const onSuccess = (res: any) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    setOpen(true);
    //aca tengo que guardar en un estado global el mail
    console.log("email: ", res.profileObj.email);

    setEmail(res.profileObj.email);

  };

  const onFailure = (res: any) => {
    console.log("LOGIN FAILED! res: ", res);
    navigate("/", { replace: true });
  };

  return (
    <>
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
    </div>
    <React.Fragment>
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`¿Desear continuar con esta cuenta?`}</DialogTitle>
      <DialogContent className="container-dialog-login">
        <DialogContentText className="color-texto-email">{`${email}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={async (e: any) => {
          e.preventDefault();
          const result = await fetchAPIAuthToken(email as any);
          
          if (result.success) {
            localStorage.setItem("token", result.token);

            console.log("token: ", result.token);

            //cargo los datos del token que fui a buscar
            await decodificarToken();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: result.message,
            });
          }

          navigate("/", { replace: true });
        }}>Continuar</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
  </>
  );
}

export { LoginGoogle };
