import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-green-950 text-green-100 border-t border-green-800/50">
      <div className="px-6 py-10">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-2xl mx-auto">

          {/* Marca */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌱</span>
              <h3 className="text-base font-bold text-white tracking-tight">
                Organi<span className="text-green-400">.Live</span>
              </h3>
            </div>

            <p className="text-green-400 text-xs leading-relaxed max-w-xs">
              Productos orgánicos frescos y naturales, cultivados con amor y
              respeto por el medio ambiente.
            </p>

            <div className="flex gap-2 pt-2">
              {['fa-whatsapp', 'fa-facebook', 'fa-x-twitter'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full
                             bg-green-800/60 hover:bg-green-600
                             text-green-300 hover:text-white
                             transition-all text-xs"
                >
                  <i className={`fa-brands ${icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Características */}
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold text-xs uppercase tracking-wider">
              Características
            </h4>
            <ul className="space-y-1.5">
              {[
                '🌿 100% Orgánico',
                '🚚 Entrega Fresca',
                '🏡 Productos Locales',
                '♻️ Sostenible',
                '💚 Sin Químicos',
              ].map((item) => (
                <li key={item} className="text-xs text-green-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold text-xs uppercase tracking-wider">
              Links Rápidos
            </h4>
            <ul className="space-y-1.5">
              {['#productos', '#contacto', '#nosotros', '#blog', '#faq'].map(
                (href) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-xs text-green-400 hover:text-green-200 transition-colors"
                    >
                      {href.replace('#', '').charAt(0).toUpperCase() +
                        href.slice(2)}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold text-xs uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-2">
              {[
                { icon: '📱', val: import.meta.env.VITE_WHATSAPP_NUMERO },
                { icon: '📧', val: import.meta.env.VITE_EMAIL },
                { icon: '📍', val: import.meta.env.VITE_ADDRESS },
              ].map(
                ({ icon, val }) =>
                  val && (
                    <li
                      key={icon}
                      className="flex items-start gap-2 text-xs text-green-400"
                    >
                      <span>{icon}</span>
                      <span className="leading-snug">{val}</span>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-10 pt-5 border-t border-green-800/50
                     flex flex-col sm:flex-row
                     items-center justify-between gap-3
                     max-w-screen-2xl mx-auto"
        >
          <p className="text-green-500 text-xs text-center sm:text-left">
            © {currentYear} Organi.Live — Hecho con 💚 para un mundo más saludable.
          </p>

          <div className="flex gap-2">
            {['🌱 Certificado Orgánico', '♻️ Eco-Friendly'].map((b) => (
              <span
                key={b}
                className="px-2.5 py-0.5 rounded-full text-[11px]
                           bg-green-800/70 text-green-300
                           border border-green-700"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;