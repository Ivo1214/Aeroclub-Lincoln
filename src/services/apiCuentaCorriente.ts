import Swal from "sweetalert2";
import { client } from "./api-backend.ts";

const getTokenLocal = localStorage.getItem("token");

export const apiCuentaCorriente = {
    // Buscar cuenta corriente de un usuario usando su ID
  getById: async function (id: string) {
    const response = await client.request({
      url: `/cuentaCorriente/${id}`,
      method: "GET",
      headers: {
        Authorization: "bearer " + getTokenLocal,
        "content-type": "application/json",
      },
    });

    if (response) {
      return response.data.saldo_cuenta;
    } else {
        console.log("Error");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${response}`,
        text: ``,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  },
};
