import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, registeredUsers } = useUser();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Nombre requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'Apellido requerido';

    if (!formData.email) {
      newErrors.email = 'Correo requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo no válido';
    } else if (registeredUsers.some(u => u.email === formData.email)) {
      newErrors.email = 'Este correo ya está registrado';
    }

    if (!formData.phone) newErrors.phone = 'Teléfono requerido';

    if (!formData.password) {
      newErrors.password = 'Contraseña requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mínimo 8 caracteres';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos';
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
      await new Promise(resolve => setTimeout(resolve, 1500));

      register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 px-4 py-10">

      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌱</div>
          <h1 className="text-2xl font-bold text-gray-800">Crear cuenta</h1>
          <p className="text-gray-500 text-sm">
            Únete a <span className="font-semibold text-green-600">Organi.Live</span>
          </p>
        </div>

        {/* Error general */}
        {errors.general && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nombre y Apellido */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                  errors.firstName ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-green-400'
                }`}
              />
              {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                  errors.lastName ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-green-400'
                }`}
              />
              {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-green-400'
              }`}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-green-400'
              }`}
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>

          {/* Contraseñas */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 pr-12 focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-green-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 pr-12 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-green-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
              {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Términos */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mt-1 rounded text-green-600 focus:ring-green-500"
            />
            <p className="text-gray-600">
              Acepto los{' '}
              <Link to="/terminos" className="text-green-600 font-semibold hover:underline">
                términos y condiciones
              </Link>
            </p>
          </div>
          {errors.acceptTerms && <p className="text-xs text-red-600">{errors.acceptTerms}</p>}

          {/* Botón */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-70"
          >
            {isLoading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Inicia sesión
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;