import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUser();

  const isActive = (path) => pathname === path;

  const baseLink =
    'relative px-3 py-2 text-sm font-medium transition-all duration-300';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/inicio" className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <h1 className="text-lg font-semibold tracking-tight text-gray-900">
            Organi<span className="text-green-600">.Live</span>
          </h1>
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-6">

          {/* 🔓 USUARIO NO LOGUEADO */}
          {!isAuthenticated && (
            <>
              {[
                { to: '/inicio', label: 'Inicio' },
                { to: '/nosotros', label: 'Nosotros' },
                { to: '/registro', label: 'Registro' }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`${baseLink} ${
                    isActive(item.to)
                      ? 'text-gray-900 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-green-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                to="/login"
                className="ml-2 px-4 py-2 text-sm font-semibold rounded-full
                           bg-green-600 text-white
                           hover:bg-green-700
                           active:scale-95
                           transition-all duration-300 shadow-sm"
              >
                Iniciar sesión
              </Link>
            </>
          )}

          {/* 🔒 USUARIO LOGUEADO */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-4">

              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-green-900">
                  {getGreeting()}, {user.firstName || user.nombre} 👋
                </p>
                <p className="text-xs text-green-600">
                  Miembro desde {formatDate(user.fechaRegistro)}
                </p>
              </div>

              <Link
                to="/perfil/editar"
                className="px-3 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                ✏️ Perfil
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm rounded-lg border border-red-400 text-red-600 hover:bg-red-50"
              >
                🚪 Salir
              </button>
            </div>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;