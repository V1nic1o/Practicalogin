import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = ({ onLoginSuccess }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(correo)) {
      toast.warning('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        correo,
        password,
      });

      const { token, usuario } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      toast.success('Inicio de sesión exitoso');

      if (onLoginSuccess) onLoginSuccess();

      navigate('/dashboard');
    } catch (err) {
      const mensaje = err.response?.data?.error || 'Error al iniciar sesión';
      toast.error(mensaje);
      setPassword('');
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
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
            ></path>
          </svg>
          <p className="text-white text-lg font-semibold">Procesando...</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

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

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded transition ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
          disabled={loading}
        >
          Ingresar
        </button>

        <p className="mt-4 text-sm text-center">
          ¿No tienes una cuenta?{' '}
          <Link
            to="/register"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;