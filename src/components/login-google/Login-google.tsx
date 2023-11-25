import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailSignIn } from "../../atomos/atoms";

const clientId = import.meta.env.VITE_CLIENT_ID;
//const clientId ="757917448675-e4ek8n24frkil8f7s8infc1ufdsq8nmg.apps.googleusercontent.com";

function LoginGoogle() {
  const navigate = useNavigate();

  //este recoil es un estado global para transmitir el email
  const [email, setEmail] = useRecoilState(emailSignIn);

  const onSuccess = (res: any) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    //aca tengo que guardar en un estado global el mail
    console.log("email: ", res.profileObj.email);

    setEmail(res.profileObj.email);

    navigate("/verificar", { replace: true });
  };

  const onFailure = (res: any) => {
    console.log("LOGIN FAILED! res: ", res);
    navigate("/", { replace: true });
  };

  return (
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
  );
}

export { LoginGoogle };
