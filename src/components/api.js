const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка${res.statusText}`);
};

const getCardData = () => {
  return fetch("https://nomoreparties.co/v1/plus-cohort-19/cards", {
    headers: {
      authorization: "858c7cb6-e0c3-4a29-bdeb-66efeccdb118",
    },
  }).then(getResponse);
};

export { getCardData };
