import React, { createContext, useContext, useCallback } from 'react';

import { AddCartItems, GetCartItems, RemoveCartItem, UpdateCartItem } from './api/cartitem';
import { GetUserByTgId } from './api/user';
const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // Получение корзины товаров с сервера
  // const user = window.Telegram.WebApp.initDataUnsafe.user;
  const fetchCartItems = useCallback(async () => {
    const user_tg_id = window.Telegram.WebApp.initDataUnsafe?.user?.id;
  
      if (!user_tg_id) {
        throw new Error('Telegram ID пользователя не найден');
      }
      const user = await GetUserByTgId(user_tg_id);
      const response = await GetCartItems(user.id);
      return response;
  }, []);

  // Добавление товара в корзину
  const addToCart = async (product, quantity) => {
    if (!product || !product.id) return;
    const user_tg_id = window.Telegram.WebApp.initDataUnsafe?.user?.id;

    if (!user_tg_id) {
      throw new Error('Telegram ID пользователя не найден');
    }
    const user = await GetUserByTgId(user_tg_id);
    const cart_items = await GetCartItems(user.id);
    if (cart_items.some((item) => item.sku === product.id)) {
      const existingItem = cart_items.find((item) => item.sku === product.id);
      updateQuantity(existingItem.id, quantity+existingItem.quantity);
      return;
    }
    const requestBody = {
      user: user.id,
      sku: product.id,
      quantity: quantity,
    };
    const response = await AddCartItems(requestBody);
    console.log('Товар успешно добавлен в корзину:', response);
  };

  // Удаление товара из корзины
  const removeFromCart = async (id) => {
    await RemoveCartItem(id);
    console.log(`Товар с ID ${id} успешно удалён из корзины`);
  };

  // Обновление количества товара в корзине
  const updateQuantity = async (id, newQuantity) => {
    const requestBody = {
      quantity: newQuantity,
    };
    await UpdateCartItem(id, requestBody);
    console.log(`Количество товара с ID ${id} успешно обновлено`);
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