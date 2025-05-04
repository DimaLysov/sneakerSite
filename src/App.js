import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

import './styles/footerFilters.css';
import './styles/cart.css';
import './styles/checkout.css';
import './styles/header.css';
import './styles/componentCSS.css';
import './styles/productCard.css';
import './styles/home.css';
import { CartProvider } from './cartContext';

import { AddUser } from './api/user';



function App() {

  useEffect(() => {
    const addUserToBackend = async () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.expand();

        const user = tg.initDataUnsafe?.user;
        console.log("Telegram User:", user);

        if (user) {
          const tg_id = user.id;
          const tg_username = user.username;

          try {
            const userData = {
              tg_id: tg_id,
              tg_username: tg_username,
            };
            console.log("Отправка данных пользователя:", userData);
            const response = await AddUser(userData);
            if (response.exists) {
              console.log("Пользователь уже существует в базе данных.");
            } else {
              console.log("Пользователь успешно добавлен:", response);
            }
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