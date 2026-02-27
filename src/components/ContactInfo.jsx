import React from 'react';

const ContactInfo = () => {
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
  const email = import.meta.env.VITE_EMAIL;
  const address = import.meta.env.VITE_ADDRESS;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMERO;

  const contactItems = [
    { icon: '📞', title: 'Teléfono', value: phoneNumber, action: 'Llamar', onClick: () => phoneNumber && window.open(`tel:${phoneNumber}`, '_self') },
    { icon: '📧', title: 'Email', value: email, action: 'Enviar email', onClick: () => email && window.open(`mailto:${email}`, '_self') },
    { icon: '📍', title: 'Dirección', value: address, action: null, onClick: null },
    {
      icon: '💬', title: 'WhatsApp', value: whatsappNumber, action: 'Chatear', special: true,
      onClick: () => {
        if (whatsappNumber) {
          window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Me interesa conocer más sobre sus productos orgánicos.')}`, '_blank');
        }
      },
    },
  ];

  const hours = [
    { day: 'Lunes – Viernes', time: '8:00 AM – 6:00 PM' },
    { day: 'Sábados', time: '8:00 AM – 4:00 PM' },
    { day: 'Domingos', time: 'Cerrado' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-green-900">📍 Información de Contacto</h2>
        <p className="text-green-500 text-xs mt-0.5">Estamos aquí para ayudarte.</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {contactItems.map(({ icon, title, value, action, onClick, special }) =>
          value ? (
            <div
              key={title}
              onClick={onClick}
              className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all ${
                special
                  ? 'col-span-2 bg-green-50 border-green-200 hover:border-green-400'
                  : 'bg-white border-green-100 hover:border-green-300'
              } ${onClick ? 'cursor-pointer hover:shadow-sm' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${special ? 'bg-green-200' : 'bg-green-100'}`}>
                {icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-green-800">{title}</h3>
                <p className="text-xs text-green-600 mt-0.5 break-all">{value}</p>
                {action && onClick && (
                  <span className="text-[10px] text-green-500 font-medium">{action} →</span>
                )}
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Horarios */}
      <div className="bg-green-900 rounded-xl p-4 text-white">
        <h3 className="text-xs font-bold flex items-center gap-1.5 mb-3">🕒 Horarios de Atención</h3>
        <div className="space-y-2">
          {hours.map(({ day, time }) => (
            <div key={day} className="flex items-center justify-between">
              <span className="text-green-300 text-xs">{day}</span>
              <span className={`text-xs font-semibold ${time === 'Cerrado' ? 'text-red-400' : 'text-green-200'}`}>{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
