import Swal from "sweetalert2";
import { client } from "./api-backend.ts";

const getTokenLocal = localStorage.getItem("token");

export const apiReciboVuelos = {
  // Ver recibos
  get: async function (email: string) {
    const response = await client.request({
      url: `/recibo-vuelos/${email}`,
      method: "GET",
      headers: {
        Authorization: "bearer " + getTokenLocal,
        "content-type": "application/json",
      },
    });

    if (Array.isArray(response.data.respuesta)) {
      // console.log(response.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Recibos cargados con exito.",
        text: ``,
        showConfirmButton: false,
        timer: 2500,
      });
      return response.data;
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al cargar recibos.",
        text: ``,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  },

  // Cargar un recibo
  post: async function (datos: any) {
    console.log(datos);
    const response = await client.request({
      url: `/recibo-vuelos/`,
      method: "POST",
      headers: {
        Authorization: "bearer " + getTokenLocal,
        "content-type": "application/json",
      },
      data: {
        emailAsociado: datos.emailAsociado,
        emailInstructor: datos.emailInstructor,
        emailGestor: datos.emailGestor,
        observaciones: datos.observaciones,
        matricula: datos.matricula,
        itinerarios: datos.itinerarios,
      },
    });

    if (response) {
      // console.log(response.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Recibo cargado con exito.",
        text: ``,
        showConfirmButton: false,
        timer: 2500,
      });
      return response.data;
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al cargar recibo.",
        text: ``,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  },
};

// Estructura que debe tener la variable "itinerarios" (Es un array)
// En caso de tener varios itinearios estos se ponen despues de la coma siguiendo
// la estructura de objeto de ejemplo

// "itinerarios": [
//     {"horaSalida":"2021-04-20 18:00:00",
//      "codAeroSalida":"LIN",
//      "horaLlegada":"2021-04-20 19:15:00",
//      "codAeroLlegada":"LIN",
//      "cantAterrizajes":"3",
//      "tipoItinerario":"Doble comando"
//      },
//       ]
