import React, { useState, useEffect, useMemo } from 'react';
import { fetchSheetData } from '../utils/googleSheetsService';
import { useCart } from '../context/CartContext';

const GoogleSheetIntegration = () => {
  const ITEMS_PER_PAGE = 10;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('name');
  const { addToCart, getItemQuantity } = useCart();

  useEffect(() => { loadProducts(); }, []);
  useEffect(() => { filterAndSortProducts(); }, [products, searchTerm, selectedCategory, sortOption]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      setProducts(await fetchSheetData());
    } catch (err) {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let result = [...products];

    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(t) ||
        p.description.toLowerCase().includes(t) ||
        (p.category && p.category.toLowerCase().includes(t))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    switch (sortOption) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'stock':
        result.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  };

  const categories = useMemo(() => {
    const cats = products
      .map(p => p.category)
      .filter((c, i, arr) => c && arr.indexOf(c) === i);
    return ['all', ...cats];
  }, [products]);

  const stats = useMemo(() => ({
    total: products.length,
    available: products.filter(p => p.stock > 5).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 5).length,
    outOfStock: products.filter(p => p.stock <= 0).length,
  }), [products]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const selectCls =
    'px-2.5 py-1.5 rounded-lg border border-green-200 bg-white text-green-800 text-xs focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer';

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center gap-3 text-green-500">
        <svg className="animate-spin w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <p className="text-sm font-medium">Cargando productos orgánicos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 flex flex-col items-center gap-3">
        <span className="text-4xl">🌿</span>
        <p className="text-red-500 text-sm font-medium">{error}</p>
        <button
          onClick={loadProducts}
          className="px-4 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-xs font-semibold transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <main className="w-full flex justify-center py-10">
      <section className="w-[95%] md:w-[85%] lg:w-[80%] max-w-7xl space-y-6">

        {/* TÍTULO */}
        <div>
          <h2 className="text-lg font-bold text-green-900">
            🛒 Nuestros Productos
          </h2>
          <p className="text-green-500 text-xs mt-0.5">
            Frescos, orgánicos y directo del campo
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total', value: stats.total, cls: 'bg-green-100 text-green-700' },
            { label: 'Disponibles', value: stats.available, cls: 'bg-emerald-100 text-emerald-700' },
            { label: 'Poco stock', value: stats.lowStock, cls: 'bg-yellow-100 text-yellow-700' },
            { label: 'Agotados', value: stats.outOfStock, cls: 'bg-red-100 text-red-600' },
          ].map(({ label, value, cls }) => (
            <div key={label} className={`rounded-xl p-3 text-center ${cls}`}>
              <p className="text-xl font-bold">{value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide opacity-70">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* CONTROLES */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-green-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-7 pr-3 py-2 rounded-lg border border-green-200 bg-white text-green-800 placeholder-green-300 text-xs focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={selectCls}
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c === 'all' ? 'Todas las categorías' : c}
              </option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={selectCls}
          >
            <option value="name">Por nombre</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="stock">Más stock</option>
          </select>
        </div>

        {/* GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedProducts.map(product => {
              const inCart = getItemQuantity(product.id);
              const isOut = product.stock <= 0;
              const isLow = product.stock > 0 && product.stock <= 5;

              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl overflow-hidden border flex flex-col transition hover:-translate-y-1 hover:shadow-lg
                    ${isOut ? 'opacity-60 border-gray-200' : 'border-green-100 hover:border-green-300'}`}
                >
                  <div className="bg-green-50 h-36 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = './placeholder-product.svg'}
                    />
                  </div>

                  <div className="p-3 flex flex-col gap-2 flex-1">
                    <h3 className="text-xs font-bold text-green-900">{product.name}</h3>
                    <p className="text-[11px] text-green-500 line-clamp-2">{product.description}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-green-700">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold
                        ${isOut ? 'bg-red-100 text-red-500' :
                          isLow ? 'bg-amber-100 text-amber-600' :
                            'bg-green-100 text-green-600'}`}
                      >
                        Stock: {product.stock}
                      </span>
                    </div>

                    <button
                      onClick={() => !isOut && addToCart(product, 1)}
                      disabled={isOut}
                      className={`w-full py-2 rounded-lg text-xs font-semibold transition
                        ${isOut
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-500 text-white active:scale-95'}`}
                    >
                      {isOut ? 'Agotado' : '+ Agregar'}
                    </button>

                    {inCart > 0 && (
                      <p className="text-center text-[10px] text-green-600 bg-green-50 rounded py-1">
                        ✅ En carrito: {inCart}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 space-y-2">
            <span className="text-4xl">🌿</span>
            <p className="text-green-600 text-sm font-medium">No se encontraron productos</p>
            <p className="text-green-400 text-xs">Prueba con otros filtros</p>
          </div>
        )}

        {filteredProducts.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between gap-3 flex-wrap pt-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-green-200 text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            <p className="text-xs text-green-700">
              PÃ¡gina {currentPage} de {totalPages}
            </p>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-green-200 text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default GoogleSheetIntegration;
