import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  GridRowsProp,
  GridRowModesModel,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  esES,
} from "@mui/x-data-grid";
import { IconButton, InputBase, Modal, Paper } from "@mui/material";
import { useState } from "react";

import { apiReciboVuelos } from "../../services/apiReciboVuelos";

import SearchIcon from "@mui/icons-material/Search";
import { CardVerRecibo } from "../card-ver-recibo/CardVerRecibo";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  esES
);
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// ************************************************************************************
// Esto te permite añadir una tupla a la lista, esta comentado por si lo necesitamos
// ************************************************************************************

// interface EditToolbarProps {
//   setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
//   setRowModesModel: (
//     newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
//   ) => void;
// }

// function EditToolbar(props: EditToolbarProps) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = randomId();
//     setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

export default function TablaAsociadosPanelAdmin() {
  // Borrar el valor cargado en useState, lo puse asi para realizar muestra/prueba del funcionamiento
  const [busqueda, setBusqueda] = useState("");
  const handleInputChange = (e: any) => {
    // Actualizar el estado 'busqueda' cada vez que el valor del InputBase cambie
    setBusqueda(e.target.value);
  };

  // ************************************************************************************
  //                                    Manejo de la api
  // ************************************************************************************
  const [rows, setRows] = useState<GridRowsProp>([]);
  const fetchData = async () => {
    try {
      const response = await apiReciboVuelos.get(busqueda);
      let i = 0;
      // Mapeo la respuesta de la api y la convierto a un array de objetos que se usara para cargar la tabla
      const resultado = response.respuesta.map((recibo: any) => {
        const reciboFormateado = {
          id: i,
          asociado: recibo[0].asociado,
          gestor: recibo[0].gestor,
          instructor: recibo[0].instructor,
          matricula: recibo[0].matricula,
          observaciones: recibo[0].observaciones,
          precioTotal: recibo[0].precioTotal,
          itinerarios: recibo[1],
        };
        i = i + 1;
        return reciboFormateado;
      });
      setRows(resultado);
    } catch (error: any) {
      // console.log(error.message);
    }
  };

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  // Utilizo este estado para almacenar la informacion que se renderiza en el modal
  const [verRecibo, setVerRecibo] = useState({});

  // ************************************************************************************
  //                      Manejo del modal para ver un asociado
  // ************************************************************************************
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setVerRecibo({});
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleVerClick = (id: GridRowId) => () => {
    setVerRecibo(rows.filter((row) => row.id === id));
    setOpen(true);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "asociado",
      headerName: "Asociado",
      width: 200,
      type: "string",
    },
    {
      field: "gestor",
      headerName: "Gestor",
      type: "string",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "instructor",
      headerName: "Instructor",
      width: 250,
      type: "string",
    },
    {
      field: "matricula",
      headerName: "Matricula",
      width: 170,
      type: "string",
    },
    {
      field: "observaciones",
      headerName: "Observaciones",
      width: 170,
      type: "string",
    },
    {
      field: "precioTotal",
      headerName: "Precio Total",
      type: "number",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Ver mas"
            className="textPrimary"
            onClick={handleVerClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={busqueda}
          placeholder="Buscar recibo de asociado"
          inputProps={{ "aria-label": "Buscar recibo de asociado" }}
          onChange={handleInputChange}
        />
        <IconButton
          type="button"
          onClick={fetchData}
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          getRowId={(rows) => rows?.id}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          // slots={{
          //   toolbar: EditToolbar,
          // }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </ThemeProvider>
      {/* Modal para ver informacion de un recibo */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <CardVerRecibo datos={verRecibo} />
        </Box>
      </Modal>
    </Box>
  );
}
