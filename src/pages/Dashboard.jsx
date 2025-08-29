import { useEffect } from 'react';
import useUsuarios from './useUsuarios';
import Header from './Header';
import UserTable from './UserTable';

const Dashboard = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const {
    usuarios,
    editandoId,
    editData,
    obtenerUsuarios,
    handleEliminar,
    handleEditar,
    handleGuardar,
    handleChange,
  } = useUsuarios();

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Header del usuario */}
        <div className="w-full">
          <Header usuario={usuario} onLogout={handleLogout} />
        </div>

        {/* Tabla de usuarios */}
        <div className="w-full overflow-x-auto">
          <UserTable
            usuarios={usuarios}
            editandoId={editandoId}
            editData={editData}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
            onGuardar={handleGuardar}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;