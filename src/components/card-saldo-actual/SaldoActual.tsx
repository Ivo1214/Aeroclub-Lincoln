import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./saldo-actual.css"
import { apiCuentaCorriente } from '../../services/apiCuentaCorriente';
import { useEffect, useState } from 'react';

export default function SaldoActual() {
  const [saldo, setSaldo] = useState<number | null>(null);

  const getSaldo = async (id: number) => {
    try {
      const response = await apiCuentaCorriente.getById(id);
      // Parsea la respuesta a un entero y actualiza el estado
      setSaldo(parseInt(response) || 0); // Si no se puede parsear, establece el saldo en 0
      alert("Falta buscar el saldo del usuario, el valor cargado es de muestra.");
    } catch (error: any) {
      console.log(error.message);
      setSaldo(null); // Manejo de error, establece el saldo en null
    }
  };

  useEffect(() => {
    getSaldo(2);
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
