import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./saldo-actual.css"
import { apiCuentaCorriente } from '../../services/apiCuentaCorriente';
import { useEffect, useState } from 'react';
import { apiUsuarios } from '../../services/apiUsuarios';

export default function SaldoActual() {
  const [saldo, setSaldo] = useState<number | null>(null);

  const getSaldo = async () => {
    try {
      const email = await apiUsuarios.getUserByEmail(sessionStorage.getItem("email") as string);
      const response = await apiCuentaCorriente.getById(email.respuesta.id_usuarios);
      // Parsea la respuesta a un entero y actualiza el estado
      setSaldo(parseInt(response) || 0); // Si no se puede parsear, establece el saldo en 0
    } catch (error: any) {
      console.log(error.message);
      setSaldo(null); // Manejo de error, establece el saldo en null
    }
  };

  useEffect(() => {
    getSaldo();
  }, []);

  return (
    <Card className="card-saldo">
      <CardContent>
        <Typography variant="h5" component="div">
          Saldo:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          $ {saldo !== null ? saldo : "Cargando..."} {/* Muestra "Cargando..." mientras se obtiene el saldo */}
        </Typography>
      </CardContent>
    </Card>
  );
}
