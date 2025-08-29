import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // ⏱️ protección contra cuelgues largos
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Interceptor global para manejo de errores con toast
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        toast.error('Sesión expirada. Por favor inicia sesión nuevamente.');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }

      if (status === 403) {
        toast.warning('Acceso denegado: No tienes permiso para esta acción.');
      }

      if (status >= 500) {
        toast.error('Error del servidor. Intenta nuevamente más tarde.');
      }
    } else {
      // Error de red u otros no relacionados a respuesta HTTP
      toast.error('Error de conexión. Verifica tu red.');
    }

    return Promise.reject(error);
  }
);

export default api;