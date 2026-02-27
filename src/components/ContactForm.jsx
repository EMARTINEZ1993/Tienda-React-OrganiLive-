import React, { useState } from 'react';
import { sendContactMessage } from '../utils/googleSheetsService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name.trim()) return alert('Por favor ingresa tu nombre');
    if (!email.trim()) return alert('Por favor ingresa tu email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return alert('Email inválido');
    if (!message.trim()) return alert('Por favor ingresa tu mensaje');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await sendContactMessage(formData);
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: '¡Mensaje enviado correctamente!',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Error al enviar',
        });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Error al enviar mensaje' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    'w-full px-3 py-2 rounded-lg border border-green-200 bg-white text-green-900 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs transition-all';
  const labelCls = 'block text-xs font-semibold text-green-800 mb-1';

  return (
    <main className="w-full flex justify-center py-14">
      <section className="w-[95%] md:w-[85%] lg:w-[80%] max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">

          {/* FORMULARIO */}
          <div className="p-6 sm:p-8">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-green-900">
                📧 Contáctanos
              </h2>
              <p className="text-green-500 text-xs mt-1">
                ¿Tienes preguntas sobre nuestros productos? ¡Escríbenos!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Nombre *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Tu teléfono"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Mensaje *</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="¿En qué podemos ayudarte?"
                  className={`${inputCls} resize-none`}
                />
              </div>

              {submitStatus && (
                <div
                  className={`px-3 py-2 rounded-lg text-xs font-medium ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-600'
                  }`}
                >
                  {submitStatus.type === 'success' ? '✅' : '❌'}{' '}
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-semibold transition disabled:opacity-60"
              >
                {isSubmitting ? 'Enviando…' : '📨 Enviar Mensaje'}
              </button>
            </form>
          </div>

          {/* IMAGEN */}
          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e"
              alt="Productos orgánicos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-green-900/40 flex items-center justify-center">
              <div className="text-center px-6">
                <h3 className="text-white text-xl font-bold">
                  Productos frescos 🌱
                </h3>
                <p className="text-white/80 text-sm mt-2">
                  Directo del campo a tu mesa
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ContactForm;