import "../pages/index.css";

import { getCards, getUserData, patchProfile, postCard } from "./api.js";
import {
  popupImage,
  formProfile,
  formPlace,
  popupProfile,
  profileName,
  profileJob,
  nameInput,
  jobInput,
} from "./data.js";
import { openPopup, openProfilePopup, closePopup } from "./modal.js";
import { renderCard } from "./card.js";
import {
  enableValidation,
  resetErrorOnReOpen,
  disableSubmitBtnOnReopen,
} from "./validate.js";

const profileAvatar = document.querySelector(".profile__avatar");

const popupNewPlace = document.querySelector(".popup_new-place");
const inputPlace = formPlace.place;
const inputImage = formPlace.link;

const btnEditProfile = document.querySelector(".profile__edit-button");
const btnCloseProfile = document.querySelector(".popup__btn-close_profile");
const btnAddCard = document.querySelector(".profile__add-button");
const btnClosePopupNewCard = document.querySelector(".popup__btn-close_place");
const btnClosePopupImage = document.querySelector(".popup__btn-close_image");

document.addEventListener("DOMContentLoaded", () => {
  popupProfile.classList.add("popupTransitions");
  popupNewPlace.classList.add("popupTransitions");
  popupImage.classList.add("popupTransitions");
});

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error-message",
  errorVisibleClass: "form__input-error-message_active",
});

function updateUserData(user) {
  profileName.textContent = user.name;
  profileJob.textContent = user.about;
  profileAvatar.src = user.avatar;
  userId = user._id;
}

function loadCards(cardsArr) {
  cardsArr.forEach(function (cardElement) {
    renderCard().addCard(cardElement);
  });
}

export let userId;
const renderInitialData = () => {
  getUserData()
    .then((data) => {
      updateUserData(data);
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке данных пользователя с сервера ${err}`);
    });
  getCards()
    .then((cardsArr) => {
      loadCards(cardsArr);
    })
    .catch((err) => {
      console.log(`Ошибка при загрузке карточек с сервера ${err}`);
    });
};
renderInitialData();

function submitProfileForm(evt) {
  evt.preventDefault();

  patchProfile(nameInput.value, jobInput.value)
    .then(() => {
      getUserData()
        .then((data) => {
          updateUserData(data);
        })
        .catch((err) => {
          console.log(
            `Ошибка при загрузке данных пользователя с сервера ${err}`
          );
        });
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(`Ошибка при отправке обновленных данных пользователя ${err}`);
    });
}

function submitNewCard(evt) {
  evt.preventDefault();

  postCard(inputPlace.value, inputImage.value)
    .then(() => {
      closePopup(popupNewPlace);
      renderCard().addCard({ name: inputPlace.value, link: inputImage.value });
      formPlace.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при отправке карточки на сервер ${err}`);
    });
}

formProfile.addEventListener("submit", submitProfileForm);
formPlace.addEventListener("submit", submitNewCard);

btnEditProfile.addEventListener("click", () => {
  resetErrorOnReOpen(formProfile);
  disableSubmitBtnOnReopen(formProfile.elements.submitProfile);
  openProfilePopup();
});

btnCloseProfile.addEventListener("click", () => closePopup(popupProfile));

btnAddCard.addEventListener("click", () => {
  formPlace.reset();
  resetErrorOnReOpen(formPlace);
  disableSubmitBtnOnReopen(formPlace.elements.submitPlace);
  openPopup(popupNewPlace);
});

btnClosePopupNewCard.addEventListener("click", () => closePopup(popupNewPlace));

btnClosePopupImage.addEventListener("click", () => closePopup(popupImage));
