import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./saldo-actual.css"

export default function SaldoActual() {
    const saldo = -25500;
  return (
    <Card className="card-saldo">
      <CardContent>
        <Typography variant="h5" component="div">
          Saldo:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          $ {saldo}
        </Typography>
      </CardContent>
    </Card>
  );
}
