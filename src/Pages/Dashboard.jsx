import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user: contextUser, isAuthenticated, logout } = useUser();

  // 🔹 Hooks SIEMPRE arriba
  const [user] = useState({
    name: contextUser
      ? `${contextUser.nombre} ${contextUser.apellido}`
      : '',
    email: contextUser?.email || '',
    avatar: contextUser?.avatar || null,
    memberSince: contextUser?.fechaRegistro || new Date().toISOString(),
    lastLogin: contextUser?.ultimoAcceso || new Date().toISOString()
  });

  const [stats] = useState({
    totalOrders: contextUser?.estadisticas?.pedidosRealizados || 0,
    totalSpent: contextUser?.estadisticas?.ahorroTotal || 0,
    favoriteProducts: contextUser?.estadisticas?.productosComprados || 0,
    loyaltyPoints: contextUser?.estadisticas?.puntosAcumulados || 0
  });

  const [recentActivity] = useState(
    contextUser?.historialActividad?.slice(0, 4) || [
      {
        id: 1,
        type: 'profile',
        description: 'Cuenta creada exitosamente',
        date: contextUser?.fechaRegistro || new Date().toISOString(),
        icon: '👤'
      }
    ]
  );

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días';
    if (hour < 18) return '¡Buenas tardes';
    return '¡Buenas noches';
  };

  const handleLogout = () => {
    if (window.confirm('¿Cerrar sesión?')) {
      logout();
      navigate('/login');
    }
  };

  // 🔹 Validación de acceso (DESPUÉS de los hooks)
  if (!isAuthenticated || !contextUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-6 rounded-xl shadow text-center space-y-3">
          <h2 className="font-bold text-green-800">Acceso requerido</h2>
          <p className="text-sm text-green-600">
            Inicia sesión para acceder a tu dashboard
          </p>
          <Link
            to="/login"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* HERO DE BIENVENIDA */}
      <section className="relative h-64 bg-gradient-to-r from-green-600 to-green-400 flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-3xl font-bold">
            {getGreeting()}, {user.name.split(' ')[0]} 👋
          </h1>





        </div>
      </section>

      {/* CONTENIDO */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">

        {/* ESTADÍSTICAS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Pedidos realizados', value: stats.totalOrders, icon: '🛒' },
            { label: 'Ahorro total', value: `$${stats.totalSpent}`, icon: '💰' },
            { label: 'Productos comprados', value: stats.favoriteProducts, icon: '🥦' },
            { label: 'Puntos acumulados', value: stats.loyaltyPoints, icon: '⭐' }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-5 flex items-center gap-4"
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-xl font-bold text-green-700">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* ACTIVIDAD RECIENTE */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-green-800 mb-4">
            Actividad reciente
          </h2>

          <ul className="space-y-3">
            {recentActivity.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center gap-4 border-b last:border-none pb-3"
              >
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(activity.date)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;