import { client } from "./api-backend.ts";

export const apiRoles = {
  // Cargar rol
  post: async function (datos: any) {
    const response = await client.request({
      url: `/roles`,
      method: "POST",
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDAyNTIyMTUsImV4cCI6MTcwMDI4MjIxNSwiZW1haWwiOiJpdm8xMjE0QGxpdmUuY29tIiwicm9sZXMiOlsiQWRtaW5pc3RyYXRvciIsIkVkaXRvciJdfQ.EGAsXLP-VngG_mc2zEgegphkABZgdB504XmNLxqusCQ",
        "content-type": "application/json",
      },
      data: {
        email: datos.email,
        rol: datos.rol,
      },
    });

    if (response) {
      // console.log(response.data);
      return response.data;
    }
  },

  // Quitar rol
  delete: async function (datos: any) {
    const response = await client.request({
      url: `/roles`,
      method: "DELETE",
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDAyNTIyMTUsImV4cCI6MTcwMDI4MjIxNSwiZW1haWwiOiJpdm8xMjE0QGxpdmUuY29tIiwicm9sZXMiOlsiQWRtaW5pc3RyYXRvciIsIkVkaXRvciJdfQ.EGAsXLP-VngG_mc2zEgegphkABZgdB504XmNLxqusCQ",
        "content-type": "application/json",
      },
      data: {
        email: datos.email,
        rol: datos.rol,
      },
    });

    if (response) {
      // console.log(response.data);
      return response.data;
    }
  },
};
