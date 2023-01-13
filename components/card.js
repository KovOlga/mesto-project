const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(card) {
  const photoCardElement = photoCardTemplateContent.cloneNode(true);
  const photoElementTitle = photoCardElement.querySelector(
    ".photo-elements__title"
  );
  photoElementTitle.textContent = card.name;
  const photoElementImage = photoCardElement.querySelector(
    ".photo-elements__image"
  );
  photoElementImage.src = card.link;
  photoElementImage.alt = card.name;
  photoCardElement
    .querySelector(".photo-elements__like-button")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("photo-elements__like-button_active");
    });
  const photoElementDeleteBtn = photoCardElement.querySelector(
    ".photo-elements__bin-button"
  );
  photoElementDeleteBtn.addEventListener("click", () => {
    const dlt = photoElementDeleteBtn.closest(".photo-elements__item");
    dlt.remove();
  });

  photoElementImage.addEventListener("click", () => {
    popupImagePicture.src = photoElementImage.src;
    popupImagePicture.alt = photoElementImage.alt;
    popupImageCaption.textContent = photoElementTitle.textContent;

    openPopup(popupImage);
  });

  return photoCardElement;
}

function renderCard(card) {
  photoElementsGallery.prepend(createCard(card));
}