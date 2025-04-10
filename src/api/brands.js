const BASE_URL = process.env.REACT_APP_PATH_URL_API;

export const fetchBrands = async () => {
    const response = await fetch(`${BASE_URL}/api/brands/`);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных брендов');
    }
    return await response.json();
  };