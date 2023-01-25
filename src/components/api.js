const mestoApiConfig = {
  baseURL: "https://nomoreparties.co/v1/plus-cohort-19",
  headers: {
    authorization: "858c7cb6-e0c3-4a29-bdeb-66efeccdb118",
    "Content-Type": "application/json",
  },
};

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка${res.statusText}`);
}

const getUserData = () => {
  return fetch(`${mestoApiConfig.baseURL}/users/me`, {
    headers: mestoApiConfig.headers,
  }).then(getResponse);
};

const patchProfile = (newName, newAbout) => {
  return fetch(`${mestoApiConfig.baseURL}/users/me`, {
    method: "PATCH",
    headers: mestoApiConfig.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout,
    }),
  });
};

const getCards = () => {
  return fetch(`${mestoApiConfig.baseURL}/cards`, {
    headers: mestoApiConfig.headers,
  }).then(getResponse);
};

const postCard = (newName, newLink) => {
  return fetch(`${mestoApiConfig.baseURL}/cards`, {
    method: "POST",
    headers: mestoApiConfig.headers,
    body: JSON.stringify({
      name: newName,
      link: newLink,
    }),
  });
};

const deleteCard = (cardId) => {
  return fetch(`${mestoApiConfig.baseURL}/cards/${cardId}`, {
    method: "DELETE",
    headers: mestoApiConfig.headers,
    body: JSON.stringify({
      _id: cardId,
    }),
  });
};

const addLike = (cardId) => {
  return fetch(`${mestoApiConfig.baseURL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: mestoApiConfig.headers,
    body: JSON.stringify({
      _id: cardId,
    }),
  });
};

const removeLike = (cardId) => {
  return fetch(`${mestoApiConfig.baseURL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: mestoApiConfig.headers,
    body: JSON.stringify({
      _id: cardId,
    }),
  });
};

export {
  getCards,
  getUserData,
  patchProfile,
  postCard,
  deleteCard,
  addLike,
  removeLike,
};
