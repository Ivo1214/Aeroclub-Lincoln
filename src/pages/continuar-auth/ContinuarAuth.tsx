import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailSignIn } from "../../atomos/atoms";
import { fetchAPIAuthToken } from "../../api/apiCalls";
import Swal from "sweetalert2";
import { useAuthToken } from "../../hooks/useAuthToken";

function ContinuarAuth() {
  const navigate = useNavigate();

  //este recoil es un estado global para transmitir el email
  const [email, setEmail] = useRecoilState(emailSignIn);

  const { decodificarToken } = useAuthToken();

  return (
    <div className="continuarAuth">
      <p>{`Desear continuar con esta cuenta ${email} aprete continuar de lo contrario cancelar`}</p>
      <button
        onClick={async (e: any) => {
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
        }}
      >
        continuar
      </button>
      <button
        onClick={(e: any) => {
          e.preventDefault();
          navigate("/", { replace: true });
        }}
      >
        cancelar
      </button>
    </div>
  );
}

export default ContinuarAuth;
