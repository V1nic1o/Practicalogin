import {
  FaEdit,
  FaTrash,
  FaSave,
  FaIdBadge,
  FaUser,
  FaEnvelope,
  FaLock,
  FaTools,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserTable = ({
  usuarios,
  editandoId,
  editData,
  onEditar,
  onEliminar,
  onGuardar,
  onChange,
}) => {
  const handleGuardar = async (id) => {
    try {
      await onGuardar(id);
      toast.success('Usuario actualizado correctamente.');
    } catch (error) {
      toast.error('Error al actualizar el usuario.');
    }
  };

  const handleEliminar = async (id) => {
    try {
      await onEliminar(id);
      toast.success('Usuario eliminado correctamente.');
    } catch (error) {
      toast.error('Error al eliminar el usuario.');
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Usuarios Registrados</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="px-4 py-2 border">
                <div className="flex items-center justify-center gap-2">
                  <FaIdBadge /> ID
                </div>
              </th>
              <th className="px-4 py-2 border">
                <div className="flex items-center justify-center gap-2">
                  <FaUser /> Nombre
                </div>
              </th>
              <th className="px-4 py-2 border">
                <div className="flex items-center justify-center gap-2">
                  <FaEnvelope /> Correo
                </div>
              </th>
              <th className="px-4 py-2 border">
                <div className="flex items-center justify-center gap-2">
                  <FaLock /> Contraseña
                </div>
              </th>
              <th className="px-4 py-2 border">
                <div className="flex items-center justify-center gap-2">
                  <FaTools /> Acciones
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-2 border text-center">{u.id}</td>

                <td className="px-4 py-2 border">
                  {editandoId === u.id ? (
                    <input
                      type="text"
                      value={editData.nombre}
                      onChange={(e) => onChange('nombre', e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    u.nombre
                  )}
                </td>

                <td className="px-4 py-2 border">
                  {editandoId === u.id ? (
                    <input
                      type="email"
                      value={editData.correo}
                      onChange={(e) => onChange('correo', e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    u.correo
                  )}
                </td>

                <td className="px-4 py-2 border text-center">
                  {editandoId === u.id ? (
                    <input
                      type="password"
                      value={editData.password}
                      onChange={(e) => onChange('password', e.target.value)}
                      className="border px-2 py-1 rounded w-full"
                      placeholder="Nueva contraseña"
                    />
                  ) : (
                    <span className="italic text-gray-400">••••••••</span>
                  )}
                </td>

                <td className="px-4 py-2 border text-center">
                  <div className="flex justify-center gap-2">
                    {editandoId === u.id ? (
                      <button
                        onClick={() => handleGuardar(u.id)}
                        className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                        title="Guardar"
                      >
                        <FaSave />
                      </button>
                    ) : (
                      <button
                        onClick={() => onEditar(u)}
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      onClick={() => handleEliminar(u.id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;