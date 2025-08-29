import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterForm = ({ onLoginSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !password.trim() || !confirmarPassword.trim()) {
      toast.error('Todos los campos son obligatorios.');
      return;
    }

    if (!isEmailValid(correo)) {
      toast.error('El correo no tiene un formato válido.');
      return;
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmarPassword) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/register', {
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        password,
      });

      const loginResponse = await api.post('/auth/login', {
        correo: correo.trim().toLowerCase(),
        password,
      });

      const { token, usuario } = loginResponse.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      if (onLoginSuccess) onLoginSuccess();

      toast.success('¡Registro exitoso!');
      navigate('/dashboard');
    } catch (err) {
      const mensaje = err?.response?.data?.error || 'Error al registrar usuario.';
      toast.error(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      {loading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col items-center justify-center">
          <svg
            className="animate-spin h-10 w-10 text-white mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
            />
          </svg>
          <p className="text-white text-lg font-semibold">Procesando...</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md z-10"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registro de usuario</h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
            minLength={2}
            maxLength={50}
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Correo</label>
          <input
            type="email"
            name="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
            minLength={6}
            maxLength={64}
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmarPassword"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
            minLength={6}
            maxLength={64}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded transition ${
            loading
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          } text-white`}
          disabled={loading}
        >
          Registrarse
        </button>

        <p className="mt-4 text-sm text-center">
          ¿Ya tienes cuenta?{' '}
          <Link to="/" className="text-blue-600 underline hover:text-blue-800">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;