import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import { fetchBrands } from '../api/brands';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState([]); // Состояние для брендов

  // Запрос к API для продуктов
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Запрос к API для брендов
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (err) {
        console.error('Ошибка при загрузке брендов:', err);
      }
    };

    loadBrands();
  }, []);

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchesSearch && matchesBrand;
  });

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="home-page">
      <div className="filters-sidebar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск кроссовок..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="brand-filters">
          <h3>Бренды</h3>
          {brands.map(brand => (
            <label key={brand.id} className="brand-checkbox">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
              />
              <span className="checkmark"></span>
              {brand.name}
            </label>
          ))}
        </div>
      </div>

      <div className="products-grid-container">
        <h2 className="products-title">Наши кроссовки</h2>
        {isLoading ? (
          <div className="loading">Загрузка...</div>
        ) : error ? (
          <div className="error">Ошибка: {error}</div>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>Ничего не найдено. Попробуйте изменить параметры поиска.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;