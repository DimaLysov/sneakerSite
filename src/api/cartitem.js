// const BASE_URL = process.env.REACT_APP_PATH_URL_API;

export const AddCartItems = async (requestBody) => {
  const response = await fetch(`http://127.0.0.1:8000/api/cart-items/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error(`Ошибка при добавлении товара в корзину: ${response.statusText}`);
}
  return await response.json();
};


export const GetCartItems = async (id) => {
  // Пока выводиться для первого пользователя
  const response = await fetch(`http://127.0.0.1:8000/api/cart-items/by-user/${id}/`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных продукта');
  }
  return await response.json();
};

export const RemoveCartItem = async (id) => {
  console.log('Удаление товара с ID:', id);
  const response = await fetch(`http://127.0.0.1:8000/api/cart-items/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Ошибка при удаление товара из корзины: ${response.statusText}`);
  }
};

export const UpdateCartItem = async (id, requestBody) => {
  const response = await fetch(`http://127.0.0.1:8000/api/cart-items/${id}/update-quantity/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error(`Ошибка при изменении товара в корзине: ${response.statusText}`);
  }
};