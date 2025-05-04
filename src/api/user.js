export const AddUser = async (requestBody) => {
    const response = await fetch(`http://127.0.0.1:8000/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 400) {
      return { exists: true };
    }

    if (!response.ok) {
      throw new Error(`Ошибка при добавлении пользователя: ${response.statusText}`);
  }
    return await response.json();
  };

export const GetUserByTgId = async (tg_id) => {
  const response = await fetch(`http://127.0.0.1:8000/api/users/by_tg_id/${tg_id}/`);
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных пользователя');
  }
  return await response.json();
};