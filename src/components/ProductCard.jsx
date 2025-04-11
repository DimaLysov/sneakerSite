import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cartContext';

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Если у товара есть размеры, но не выбран размер
    if (product.sizes?.length > 0 && !selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    
    // Если у товара есть цвета, но не выбран цвет
    if (product.colors?.length > 0 && !selectedColor) {
      alert('Пожалуйста, выберите цвет');
      return;
    }

    // Добавляем в корзину с выбранными параметрами или значениями по умолчанию
    addToCart(
      product, 
      product.sizes?.length > 0 ? selectedSize : 'one-size', 
      product.colors?.length > 0 ? selectedColor : 'default'
    );
    
    alert(`${product.name} добавлен в корзину!`);
  };

  return (
    <div className="product-card">
      <div className="card-badge">Новинка</div>
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.jpg';
            }}
          />
        </div>
      </Link>

      <div className="product-info">
        <h3>{product.brand} {product.name}</h3>
        {/* <p className="price">{product.price.toLocaleString()} ₽</p> */}
        
        {/* Блок выбора размера - показываем только если есть размеры */}
        {product.sizes?.length > 0 && (
          <div className="size-selector">
            <p>Размер:</p>
            <div className="sizes">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Блок выбора цвета - показываем только если есть цвета */}
        {product.colors?.length > 0 && (
          <div className="color-selector">
            <p>Цвет:</p>
            <div className="colors">
              {product.colors.map(color => (
                <div
                  key={color}
                  className={`color-option ${selectedColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        // Кнопка активна всегда, если нет вариантов выбора
        disabled={product.sizes?.length > 0 && !selectedSize}
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductCard;