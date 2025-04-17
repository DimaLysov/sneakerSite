// const BASE_URL = process.env.REACT_APP_PATH_URL_API;

export const fetchBrands = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/brands/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных брендов');
    }
    return await response.json();
  };