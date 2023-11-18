import { TablaAdminUsuarios } from "../../components/tablaAdminUsuarios/TablaAdminUsuarios";
import { useTablaAdminUsuarios } from "../../hooks/useTablaAdminUsuarios";
import "./AdminAdministrarUsuarios.css";

function AdminAdministrarUsuarios() {
  const {
    toggleColors,
    usuarios,
    showColors,
    handleChangeSort,
    sortedUsuarios,
    setInvertir,
    invertir,
  } = useTablaAdminUsuarios();

  return (
    <div className="panelAdminContainer">
      <h1 className="panelAdminTitle">Administrar Usuarios</h1>
      {usuarios.length > 0 && (
        <TablaAdminUsuarios
          changeSorting={handleChangeSort}
          showColors={showColors}
          usuarios={sortedUsuarios}
          setInvertir={setInvertir}
          invertir={invertir}
        />
      )}
    </div>
  );
}

export default AdminAdministrarUsuarios;
