import Swal from "sweetalert2";
import { client } from "./api-backend";
const getTokenLocal = await localStorage.getItem("token");

export const apiTransacciones =  {
    
  // Obtener todas las transaciones
  get: async function () {
    const response = await client.request({
      url: `/transacciones/`,
      method: "GET",
      headers: {
        Authorization: "bearer " + getTokenLocal,
        "content-type": "application/json",
      },
    });

    if (response) {
        // console.log(response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Transacciones cargadas con exito.",
          text: ``,
          showConfirmButton: false,
          timer: 2500,
        });
        // console.log(response.data.response);
        return response.data.response;
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al cargar transaciones.",
          text: ``,
          showConfirmButton: false,
          timer: 2500,
        });
      }
  },

  // Crear una transaccion
  post: async function (datos: any) {
    const response = await client.request({
      url: `/transacciones/`,
      method: "POST",
      headers: {
        Authorization: "bearer " + getTokenLocal,
        "content-type": "application/json",
      },
      data: {
        monto: datos.monto,
        idUsuario: datos.idUsuario, 
        motivo: datos.motivo,
        tipoPago: datos.tipoPago,
        fecha: datos.fecha
      },
    });

    if (response) {
      // console.log(response.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Transacción exitosa.",
        text: ``,
        showConfirmButton: false,
        timer: 2500,
      });
      return response.data;
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error en la transacción.",
        text: ``,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  },


};
