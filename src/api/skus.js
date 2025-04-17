// const BASE_URL = process.env.REACT_APP_PATH_URL_API;

export const fetchSkuByModelSneaker = async (model_sneaker_id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/skus/by-model_sneaker/${model_sneaker_id}/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных модели');
    }
    return await response.json();
  };