import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Escuchar cambios manuales en el token
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Cuando el login o registro es exitoso
  const handleLoginSuccess = () => {
    setToken(localStorage.getItem('token') || '');
  };

  return (
    <>
      <Router>
        <Routes>
          {/* Página de inicio de sesión */}
          <Route
            path="/"
            element={
              !token ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />
            }
          />

          {/* Página de registro */}
          <Route
            path="/register"
            element={
              !token ? <RegisterForm onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />
            }
          />

          {/* Ruta protegida del dashboard */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/" />}
          />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

      {/* Contenedor global de notificaciones */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;