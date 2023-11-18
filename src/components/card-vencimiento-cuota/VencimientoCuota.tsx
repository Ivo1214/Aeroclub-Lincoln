import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./vencimientoCuota.css";

export default function VencimientoCMA() {
    const dias = 18;
  return (
    <Card className="card-cuota">
      <CardContent>
        <Typography variant="h5" component="div">
          Dias para vencimiento de cuota:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {dias}
        </Typography>
      </CardContent>
    </Card>
  );
}
