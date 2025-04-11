import React from 'react';
import { useCart } from '../cartContext';

const Cart = ({ onClose }) => {
  const { 
    cartItems = [], 
    removeFromCart, 
    updateQuantity,
    totalPrice = 0,
    deliveryFee = 0,
    orderTotal = 0
  } = useCart();

  return (
    <div className="cart-modal">
      <div className="cart-header">
        <h2>Ваша корзина</h2>
        <button onClick={onClose} className="close-btn">×</button>
      </div>

      {cartItems.length > 0 ? (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item">
                <img 
                  src={item.image_url || '/images/placeholder.jpg'} 
                  alt={item.name} 
                  className="item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                
                <div className="item-details">
                  <h3>{item.name || 'Без названия'}</h3>
                  <p>Бренд: {item.brand || 'Не указан'}</p>
                  {item.size && item.size !== 'one-size' && (
                    <p>Размер: {item.size}</p>
                  )}
                  {item.color && item.color !== 'default' && (
                    <p>Цвет: {item.color}</p>
                  )}
                  
                  <div className="quantity-control">
                    <button 
                      onClick={() => updateQuantity(
                        item.id, 
                        item.size, 
                        item.color, 
                        (item.quantity || 1) - 1
                      )}
                      disabled={(item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button 
                      onClick={() => updateQuantity(
                        item.id, 
                        item.size, 
                        item.color, 
                        (item.quantity || 1) + 1
                      )}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="item-price">
                  <p>{((item.price || 0) * (item.quantity || 1)).toLocaleString()} ₽</p>
                  <button 
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="remove-btn"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Подытог</span>
              <span>{(totalPrice || 0).toLocaleString()} ₽</span>
            </div>
            <div className="summary-row">
              <span>Доставка</span>
              <span>
                {deliveryFee === 0 ? 'Бесплатно' : `${(deliveryFee || 0).toLocaleString()} ₽`}
              </span>
            </div>
            <div className="summary-row total">
              <span>Итого</span>
              <span>{(orderTotal || 0).toLocaleString()} ₽</span>
            </div>
          </div>

          <div className="cart-actions">
            <button className="checkout-btn">Оформить заказ</button>
            <button className="continue-btn" onClick={onClose}>
              Продолжить покупки
            </button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <p>Ваша корзина пуста</p>
          <button className="continue-btn" onClick={onClose}>
            Начать покупки
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;