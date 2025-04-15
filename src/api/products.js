const BASE_URL = process.env.REACT_APP_PATH_URL_API;

export const fetchProducts = async () => {
    const response = await fetch(`${BASE_URL}/api/model-sneakers/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных продуктов');
    }
    return await response.json();
  };


export const fetchProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/api/model-sneakers/${id}/`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных продукта');
  }
  return await response.json();
};