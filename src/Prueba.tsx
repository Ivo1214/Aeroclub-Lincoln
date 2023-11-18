import React from 'react';
import { apiUsuarios } from '../src/services/apiUsuarios';

const Prueba = () => {
  const llamadaApi = async () => {
    console.log("me hicieron click");

    try {
      const response = await apiUsuarios.getUsuarios();
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <button onClick={llamadaApi}>Prueba</button>
    </div>
  );
};

export default Prueba;
