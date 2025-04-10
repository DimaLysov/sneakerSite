import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  // const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Моковые данные (замените на данные из API)
  const product = {
    id: 1,
    name: 'Nike Air Max 95',
    price: 12000,
    brand: 'Nike',
    images: [
      '/images/nike-air-max.jpg',
      '/images/nike-air-max.jpg',
      '/images/nike-air-max.jpg'
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ['black', 'white', 'red'],
  };

  return (
    <div className="product-detail-page">
      <div className="product-gallery">
        <div className="thumbnail-list">
          {product.images.map((img, index) => (
            <div 
              key={index}
              className={`thumbnail ${activeImage === index ? 'active' : ''}`}
              onClick={() => setActiveImage(index)}
            >
              <img src={img} alt={`${product.name} ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="main-image">
          <img src={product.images[activeImage]} alt={product.name} />
        </div>
      </div>

      <div className="product-info">
        <div className="breadcrumbs">
          <span>Главная</span> / <span>Кроссовки</span> / <span>{product.brand}</span>
        </div>

        <h1 className="product-title">{product.name}</h1>
        <div className="price-section">
          <span className="current-price">{product.price.toLocaleString()} ₽</span>
          {/* <span className="old-price">14 999 ₽</span>
          <span className="discount">-20%</span> */}
        </div>

        <div className="color-options">
          <h3>Цвет:</h3>
          <div className="colors">
            {product.colors.map((color, index) => (
              <div 
                key={index}
                className="color-circle"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="size-selector">
          <h3>Размер:</h3>
          <div className="sizes">
            {product.sizes.map(size => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <a href="#size-guide" className="size-guide-link">Таблица размеров</a>
        </div>

        <div className="quantity-selector">
          <h3>Количество:</h3>
          <div className="quantity-control">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <div className="product-actions">
          <button className="add-to-cart-btn">
            Добавить в корзину — {(product.price * quantity).toLocaleString()} ₽
          </button>
        </div>

        <div className="delivery-info">
          <div className="delivery-option">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,7H16V6A4,4 0 0,0 12,2A4,4 0 0,0 8,6H10A2,2 0 0,1 12,4A2,2 0 0,1 14,6V7H5V21H19V7M8,19H6V17H8V19M8,16H6V14H8V16M8,13H6V11H8V13M13,19H11V17H13V19M13,16H11V14H13V16M13,13H11V11H13V13M18,19H16V17H18V19M18,16H16V14H18V16M18,13H16V11H18V13Z"/>
            </svg>
            <span>Доставка за 1-3 дня</span>
          </div>
          <div className="delivery-option">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,7H13V13H17V15H11V7Z"/>
            </svg>
            <span>Возврат в течение 14 дней</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;