import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="w-full bg-gradient-to-b from-green-50 to-white">

      {/* HERO */}
      <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            🌱 Sobre Nosotros
          </h1>
          <p className="max-w-2xl mx-auto text-green-100 text-lg">
            Cultivamos bienestar, sostenibilidad y confianza a través de productos
            orgánicos que respetan la naturaleza y tu salud.
          </p>
        </div>

        {/* Onda decorativa */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-16"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86
              82.39-16.72 168.19-17.73 250.45-.39
              57.84 12.15 114.6 31.61 172 41.86
              82.39 14.69 168.19 14.2 250.45-.39
              V120H0V0z"
              className="fill-white"
            />
          </svg>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* QUIÉNES SOMOS */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¿Quiénes somos?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              En <span className="font-semibold text-green-600">Organi.Live</span> creemos
              en una forma de vida más consciente. Nacimos con el propósito de conectar
              a las personas con productos orgánicos de alta calidad, cultivados de
              manera responsable y sostenible.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Trabajamos de la mano con productores locales, promoviendo prácticas
              agrícolas limpias y apoyando economías justas.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
              alt="Productos orgánicos"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* MISIÓN, VISIÓN, VALORES */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: '🌍 Misión',
              text: 'Ofrecer productos orgánicos frescos y confiables, promoviendo una alimentación saludable y un impacto positivo en el planeta.'
            },
            {
              title: '🚀 Visión',
              text: 'Ser una referencia en el consumo responsable, liderando el cambio hacia un futuro más sostenible.'
            },
            {
              title: '💚 Valores',
              text: 'Sostenibilidad, transparencia, calidad, respeto por la naturaleza y compromiso con la comunidad.'
            }
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow-md border border-green-100 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-green-600 rounded-3xl p-10 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-3">
            Sé parte del cambio 🌿
          </h2>
          <p className="max-w-xl mx-auto text-green-100 mb-6">
            Únete a nuestra comunidad y descubre una forma más saludable,
            consciente y responsable de consumir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/registro"
              className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition"
            >
              Crear cuenta
            </Link>
            <Link
              to="/contacto"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Contáctanos
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;