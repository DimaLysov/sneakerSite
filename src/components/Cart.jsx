import React, { useEffect, useState } from 'react';
import { useCart } from '../cartContext';

const Cart = ({ onClose }) => {
  const { 
    fetchCartItems, 
    removeFromCart, 
    updateQuantity,
  } = useCart();

  const [cartItems, setCartItems] = useState([]); // Локальное состояние для хранения списка товаров
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки

    // Общая стоимость товаров в корзине
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + ((item.price || 0) * (item.quantity || 1)),
    0
  );

  const deliveryFee = totalPrice > 10000 ? 0 : 500;
  const orderTotal = totalPrice + deliveryFee;

  // Загружаем список товаров при монтировании компонента
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setIsLoading(true);
        const items = await fetchCartItems(); // Вызываем fetchCartItems и получаем список товаров
        setCartItems(items); // Сохраняем полученные товары в локальное состояние
      } catch (err) {
        console.error('Ошибка при загрузке корзины:', err);
        setError('Не удалось загрузить корзину. Попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const uppdateCartItems = async () => {
    try {
      setError(null);
      const updatedItems = await fetchCartItems();
      setCartItems(updatedItems);
    } catch (err) {
      console.error('Ошибка при обновлении корзины:', err);
      setError('Не удалось обновить корзину. Попробуйте позже.');
    }
  }

  // Обработчик удаления товара
  const handleRemoveFromCart = async (id) => {
    try {
      await removeFromCart(id); 
      await uppdateCartItems();
    } catch (err) {
      console.error('Ошибка при удалении товара:', err);
      setError('Не удалось удалить товар. Попробуйте позже.');
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      await updateQuantity(id, newQuantity); 
      await uppdateCartItems();
    } catch (err) {
      console.error('Ошибка при обновлении количества товара:', err);
      setError('Не удалось обновить количество товара. Попробуйте позже.');
    }
  };


  if (isLoading) {
    return <div className="loading">Загрузка корзины...</div>;
  }

  if (error) {
    return <div className="error">Ошибка:</div>;
  }

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
                  <p>Бренд: {item.brand || 'Не указан'}, Модель: {item.name || 'Без названия'}</p>
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