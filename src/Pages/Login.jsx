import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo no válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const result = login(formData.email, formData.password);

      if (result.success) {
        navigate('/perfil');
      } else {
        setErrors({ general: result.error });
      }
    } catch {
      setErrors({ general: 'Error al iniciar sesión' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 px-4">
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌱</div>
          <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
          <p className="text-gray-500 text-sm">
            Ingresa a tu cuenta de <span className="font-semibold text-green-600">Organi.Live</span>
          </p>
        </div>

        {/* Error general */}
        {errors.general && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-2 text-sm">
            {errors.general}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 
                ${errors.email 
                  ? 'border-red-400 focus:ring-red-300' 
                  : 'border-gray-300 focus:ring-green-400'
                }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full rounded-lg border px-4 py-2 pr-12 focus:outline-none focus:ring-2 
                  ${errors.password 
                    ? 'border-red-400 focus:ring-red-300' 
                    : 'border-gray-300 focus:ring-green-400'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Opciones */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
              Recordarme
            </label>
            <Link
              to="/recuperar-password"
              className="text-green-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold py-2 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-green-600 font-semibold hover:underline">
            Regístrate aquí
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;