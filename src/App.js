import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import './styles/footerFilters.css';
import './styles/cart.css';
import './styles/header.css';
import { CartProvider } from './cartContext';

import { AddUser, GetUserByTgId } from './api/user';



function App() {

  useEffect(() => {
    const addUserToBackend = async () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;

        // Инициализация (можно раскрыть интерфейс)
        tg.expand();

        // Получаем данные пользователя
        const user = tg.initDataUnsafe?.user;
        console.log("Telegram User:", user);

        // Если пользователь существует, отправляем данные на API
        if (user) {
          const tg_id = user.id;
          const tg_username = user.username;

          try {
            // Проверяем, существует ли пользователь
            const existingUser = await GetUserByTgId(tg_id);
            if (existingUser) {
              console.log("Пользователь уже существует:", existingUser);
              return; 
            }

            // Если пользователь не существует, добавляем его
            const userData = {
              tg_id: tg_id,
              tg_username: tg_username,
            };

            console.log("Отправка данных пользователя:", userData);

            const response = await AddUser(userData);
            console.log("Пользователь успешно добавлен:", response);
          } catch (error) {
            console.error("Ошибка при обработке пользователя:", error);
          }
        } else {
          console.error("Telegram WebApp не доступен.");
        }
      } 
    };

    // Вызываем асинхронную функцию
    addUserToBackend();
  }, []);

  return (
    <Router>
      <CartProvider>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </CartProvider>
    </Router>

  );
}

export default App;