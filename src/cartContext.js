import React, { createContext, useContext, useState } from 'react';

import { AddCartItems, GetCartItems, RemoveCartItem, UpdateCartItem } from './api/cartitem';
import { GetUserByTgId } from './api/user';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получение корзины товаров с сервера
  // const user = window.Telegram.WebApp.initDataUnsafe.user;
  const fetchCartItems = async () => {
    try {
      setIsLoading(true);

      const user_tg_id = window.Telegram.WebApp.initDataUnsafe?.user?.id;

      if (!user_tg_id) {
        throw new Error('Telegram ID пользователя не найден');
      }
      const user = await GetUserByTgId(user_tg_id);
      const response = await GetCartItems(user.id);
      return response;
    } catch (error) {
      console.error('Ошибка при получении корзины:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Добавление товара в корзину
  const addToCart = async (product, quantity) => {
    if (!product || !product.id) return;
    try {
      const user_tg_id = window.Telegram.WebApp.initDataUnsafe?.user?.id;

      if (!user_tg_id) {
        throw new Error('Telegram ID пользователя не найден');
      }
      const user = await GetUserByTgId(user_tg_id);
      console.log('user:', user);

      const requestBody = {
        user: user.id,
        sku: product.id,
        quantity: quantity,
      };
      setIsLoading(true);
      const response = await AddCartItems(requestBody);
      console.log('Товар успешно добавлен в корзину:', response);
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Удаление товара из корзины
  const removeFromCart = async (id) => {
    try {
      setIsLoading(true);
      await RemoveCartItem(id);
      console.log(`Товар с ID ${id} успешно удалён из корзины`);
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Обновление количества товара в корзине
  const updateQuantity = async (id, newQuantity) => {
    try {
      const requestBody = {
        quantity: newQuantity,
      };
      setIsLoading(true);
      await UpdateCartItem(id, requestBody);
      console.log(`Количество товара с ID ${id} успешно обновлено`);
    } catch (error) {
      console.error('Ошибка при обновлении количества товара в корзине:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        fetchCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};