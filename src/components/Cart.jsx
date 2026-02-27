import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart, generateWhatsAppMessage } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const fmt = (price) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

  const sendToWhatsApp = () => {
    if (!items.length) return alert('El carrito está vacío');
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '573222132187';
    window.open(`https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`, '_blank');
  };

  const inc = (id, qty, max) => { if (qty < max) updateQuantity(id, qty + 1); };
  const dec = (id, qty) => { if (qty > 1) updateQuantity(id, qty - 1); else removeFromCart(id); };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-green-600 hover:bg-green-500 shadow-lg flex items-center justify-center text-lg transition-all hover:scale-105 active:scale-95"
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-0.5">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setIsOpen(false)}>
          <div className="w-full max-w-xs h-full bg-white flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-green-800 text-white">
              <h2 className="text-sm font-bold">🛒 Carrito de Compras</h2>
              <button onClick={() => setIsOpen(false)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-green-700 text-xs transition-colors">✕</button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-green-400 py-12">
                  <span className="text-4xl opacity-30">🛒</span>
                  <p className="text-sm font-medium text-green-500">Tu carrito está vacío</p>
                </div>
              ) : (
                <ul className="divide-y divide-green-50 px-3 py-1">
                  {items.map((item) => (
                    <li key={item.id} className="py-3 flex gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-green-900 truncate">{item.name}</h4>
                        {item.category && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded-full text-[10px] bg-green-100 text-green-600">
                            {item.category}
                          </span>
                        )}
                        <p className="text-[11px] text-green-500 mt-0.5">{fmt(item.price)} c/u</p>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <div className="flex items-center gap-0.5 bg-green-50 border border-green-200 rounded-full px-1">
                          <button onClick={() => dec(item.id, item.quantity)} className="w-5 h-5 flex items-center justify-center text-green-700 hover:bg-green-200 rounded-full text-sm font-bold transition-colors">−</button>
                          <span className="w-5 text-center text-xs font-semibold text-green-800">{item.quantity}</span>
                          <button onClick={() => inc(item.id, item.quantity, item.stock)} disabled={item.quantity >= item.stock} className="w-5 h-5 flex items-center justify-center text-green-700 hover:bg-green-200 rounded-full text-sm font-bold transition-colors disabled:opacity-30">+</button>
                        </div>
                        <span className="text-xs font-bold text-green-700">{fmt(item.price * item.quantity)}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-400 hover:text-red-600 transition-colors">🗑 quitar</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-green-100 px-4 py-3 bg-green-50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-500">{totalItems} productos</span>
                  <span className="text-base font-bold text-green-800">{fmt(totalPrice)}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={clearCart} className="flex-1 py-1.5 rounded-lg border border-green-300 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors">
                    Vaciar
                  </button>
                  <button onClick={sendToWhatsApp} className="flex-1 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-semibold shadow transition-colors flex items-center justify-center gap-1">
                    💬 Pedir por WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
