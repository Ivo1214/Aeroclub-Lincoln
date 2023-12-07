import { client } from "./api-backend.ts";

const getTokenLocal = localStorage.getItem("token");

export const apiLogin = {
  // Lista completa de aeronaves

  get: async function () {
    const response = await client.request({
      url: `/auth/`,
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    if (response) {
      // console.log(response.data);
      return response.data.respuesta;
    }
  },

  // Cargar aeronave
  post: async function (datos: any) {
    const response = await client.request({
      url: `/aeronaves/`,
      method: "POST",
      headers: {
        Authorization: "bearer " + getTokenLocal,
        "content-type": "application/json",
      },
      data: {
        marca: datos.marca,
        modelo: datos.modelo,
        matricula: datos.matricula,
        potencia: datos.potencia,
        clase: datos.clase,
        fecha_adquisicion: datos.fecha_adquisicion,
        consumo_por_hora: datos.consumo_por_hora,
        path_documentacion: datos.path_documentacion,
        descripcion: datos.descripcion,
        path_imagen_aeronave: datos.path_imagen_aeronave,
        id_aeronaves: datos.id_aeronaves,
        estado_hab_des: datos.estado_hab_des,
      },
    });

    if (response) {
      // console.log(response.data);
      return response.data;
    }
  },



  getByEmail: async function (email: string) {
    console.log(email);
    const response = await client.request({
      url: `/auth/${email}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (response) {
      // console.log(response.data);
      return response;
    }
  },
};
