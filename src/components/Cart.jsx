import React, { useEffect, useState } from 'react';
import { useCart } from '../cartContext';

import { useNavigate } from 'react-router-dom';

const Cart = ({ onClose }) => {
  const { 
    fetchCartItems, 
    removeFromCart, 
    updateQuantity,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout'); // Перенаправление на страницу оформления заказа
  };
  const [cartItems, setCartItems] = useState([]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + ((item.price || 0) * (item.quantity || 1)),
    0
  );

  useEffect(() => {
    const loadCartItems = async () => {
      const items = await fetchCartItems(); 
      setCartItems(items);
  };

    loadCartItems();
  }, [fetchCartItems]);

  const uppdateCartItems = async () => {
    const updatedItems = await fetchCartItems();
    setCartItems(updatedItems);
  }

  const handleRemoveFromCart = async (id) => {
    await removeFromCart(id); 
    await uppdateCartItems();
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    await updateQuantity(id, newQuantity); 
    await uppdateCartItems();
  };

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
                  src={item.image_url} 
                  alt={item.name}   
                  className="item-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                
                <div className="item-details">
                  <p>Бренд: {item.brand || 'Не указан'}</p>
                  <p>Модель: {item.name || 'Без названия'}</p>
                  <p>Размер: {item.size}</p>
                  <p>Цвет: {item.color}</p>
                  
                  <div className="quantity-control">
                    <button 
                      onClick={() => handleUpdateQuantity(
                        item.id,  
                        (item.quantity || 1) - 1
                      )}
                      disabled={(item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(
                        item.id,  
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
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="remove-btn"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row total">
              <span>Итого</span>
              <span>{(totalPrice || 0).toLocaleString()} ₽</span>
            </div>
          </div>

          <div className="cart-actions">
            <button className="checkout-btn" onClick={handleCheckout}>
              Оформить заказ
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