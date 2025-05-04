import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUserByTgId, AddUser } from '../api/user';
import { RemoveCartItem } from '../api/cartitem';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Получение данных пользователя при загрузке страницы
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user_tg_id = window.Telegram.WebApp.initDataUnsafe?.user?.id;
        if (!user_tg_id) {
          throw new Error('Telegram ID пользователя не найден');
        }

        const user = await GetUserByTgId(user_tg_id);
        if (user) {
          setFormData({
            fullName: user.full_name || '',
            phone: user.phone || '',
            address: user.address || '',
          });
        }
      } catch (err) {
        console.error('Ошибка при загрузке данных пользователя:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Обработчик изменения полей ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user_tg_id = window.Telegram.WebApp.initDataUnsafe?.user?.id;
      if (!user_tg_id) {
        throw new Error('Telegram ID пользователя не найден');
      }

      // Сохранение данных пользователя
      await AddUser({
        tg_id: user_tg_id,
        full_name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      });

      // Очистка корзины
      await RemoveCartItem(user_tg_id);

      alert('Заказ успешно оформлен!');
      navigate('/'); // Перенаправление на главную страницу
    } catch (err) {
      console.error('Ошибка при оформлении заказа:', err);
      setError(err.message);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="checkout">
      <h1>Оформление заказа</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">ФИО</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Номер телефона</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Адрес доставки</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Оформить заказ
        </button>
      </form>
    </div>
  );
};

export default Checkout;