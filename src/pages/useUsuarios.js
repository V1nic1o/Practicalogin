import { useState } from 'react';
import api from '../services/api';

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({ nombre: '', correo: '', password: '' });

  const obtenerUsuarios = async () => {
    try {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    } catch (err) {
      console.error('Error al cargar usuarios', err);
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = confirm('¿Seguro que deseas eliminar este usuario?');
    if (!confirmacion) return;

    try {
      await api.delete(`/usuarios/${id}`);
      obtenerUsuarios();
    } catch (err) {
      console.error('Error al eliminar', err);
    }
  };

  const handleEditar = (usuario) => {
    setEditandoId(usuario.id);
    setEditData({ nombre: usuario.nombre, correo: usuario.correo, password: '' });
  };

  const handleGuardar = async (id) => {
    try {
      const payload = { nombre: editData.nombre, correo: editData.correo };
      if (editData.password.trim()) payload.password = editData.password;

      await api.put(`/usuarios/${id}`, payload);
      setEditandoId(null);
      setEditData({ nombre: '', correo: '', password: '' });
      obtenerUsuarios();
    } catch (err) {
      console.error('Error al actualizar usuario', err);
    }
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  return {
    usuarios,
    editandoId,
    editData,
    obtenerUsuarios,
    handleEliminar,
    handleEditar,
    handleGuardar,
    handleChange,
  };
};

export default useUsuarios;