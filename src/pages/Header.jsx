import { useState } from 'react';
import { FiUser, FiMail, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Header = ({ usuario, onLogout }) => {
  const [cargando, setCargando] = useState(false);

  const handleLogout = () => {
    setCargando(true);
    setTimeout(() => {
      onLogout();
      toast.success('Sesión cerrada exitosamente.');
    }, 1500); // Simula un tiempo de salida
  };

  return (
    <>
      {/* Loader pantalla completa */}
      {cargando && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex flex-col justify-center items-center space-y-4">
          <div className="loader border-4 border-white border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
          <p className="text-white text-lg font-semibold animate-pulse">Cerrando sesión...</p>
        </div>
      )}

      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <FiUser className="text-blue-600" />
            Bienvenido, {usuario?.nombre}
          </h1>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <FiMail className="text-gray-500" />
            {usuario?.correo}
          </p>
        </div>
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 transition-colors duration-300 p-2 rounded-full"
        >
          <FiLogOut className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default Header;