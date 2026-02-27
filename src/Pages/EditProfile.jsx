import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../App.css';

const EditProfile = () => {
  const { user, updateUser, isAuthenticated } = useUser();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Colombia',
    bio: ''
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, ...user });
      if (user.avatar) setAvatarPreview(user.avatar);
    }
    // eslint-disable-next-line
  }, [user]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow border text-center space-y-3">
          <h2 className="font-bold text-green-900">Acceso requerido</h2>
          <p className="text-sm text-green-600">
            Inicia sesión para editar tu perfil
          </p>
          <Link
            to="/login"
            className="inline-block px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = ev => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');

    await new Promise(r => setTimeout(r, 1500));
    updateUser({ ...formData, avatar: avatarPreview });

    setSuccessMessage('Perfil actualizado correctamente');
    setIsLoading(false);
  };

  return (
    <main className="w-full flex justify-center py-10">
      <section className="w-[95%] md:w-[85%] lg:w-[80%] max-w-6xl space-y-6">

        {/* Header */}
        <div>
          <nav className="text-xs text-green-500 mb-1">
            <Link to="/perfil" className="hover:underline">Perfil</Link> → Editar
          </nav>
          <h1 className="text-2xl font-bold text-green-900">
            ✏️ Editar Perfil
          </h1>
          <p className="text-sm text-green-600">
            Actualiza tu información personal
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow border border-green-100 p-6 space-y-8"
        >

          {/* Avatar */}
          <div>
            <h2 className="text-sm font-bold text-green-800 mb-3">
              📸 Foto de perfil
            </h2>

            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-green-100 overflow-hidden flex items-center justify-center text-green-700 font-bold text-xl">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  `${formData.firstName?.[0] || ''}${formData.lastName?.[0] || ''}`
                )}
              </div>

              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  id="avatar"
                />
                <label
                  htmlFor="avatar"
                  className="px-4 py-1.5 bg-green-600 text-white text-xs rounded-lg cursor-pointer hover:bg-green-500"
                >
                  Cambiar foto
                </label>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={() => setAvatarPreview(null)}
                    className="block text-xs text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['firstName', 'Nombre'],
              ['lastName', 'Apellido'],
              ['email', 'Email'],
              ['phone', 'Teléfono']
            ].map(([name, label]) => (
              <div key={name}>
                <label className="block text-xs font-semibold text-green-800 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-green-200 text-xs focus:ring-2 focus:ring-green-400"
                />
              </div>
            ))}
          </div>

          {/* Extra */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="input" />
            <select name="gender" value={formData.gender} onChange={handleChange} className="input">
              <option value="">Género</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ciudad" className="input" />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-green-800 mb-1">
              Biografía
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 rounded-lg border border-green-200 text-xs focus:ring-2 focus:ring-green-400 resize-none"
            />
          </div>

          {/* Mensajes */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-lg px-3 py-2">
              ✅ {successMessage}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Link
              to="/perfil"
              className="px-4 py-2 text-xs rounded-lg border border-green-200 text-green-700 hover:bg-green-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 text-xs rounded-lg bg-green-600 text-white hover:bg-green-500 disabled:opacity-60"
            >
              {isLoading ? 'Guardando…' : '💾 Guardar cambios'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditProfile;