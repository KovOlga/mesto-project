import "../pages/index.css";
import FormValidator from "./FormValidator.js";
import Api from "./Api.js";
import { showPreloader, hidePreloader } from "./utils.js";
import {
  popupImage,
  formProfile,
  formPlace,
  popupProfile,
  profileName,
  popupAgreeDelete,
  profileJob,
  nameInput,
  jobInput,
} from "./data.js";
import { renderCard, setCurrentUserId } from "./card.js";

import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm";

export const imagePopup = new PopupWithImage(popupImage);

const avatarPopup = new PopupWithForm(popupEditAvatar, 
  {handleSubmit: () => {
    return user
}});

const closeButtons = document.querySelectorAll(".popup__btn-close");

//аватар
const avatar = document.querySelector(".profile__avatar");
const btnAvatarEdit = document.querySelector(".profile__avatar-container");
const popupEditAvatar = document.querySelector(".popup_edit-avatar");
const formAvatar = document.forms.avatar;
const inputAvatar = formAvatar.elements.avatar;
const btnSubmitAvatar = formAvatar.elements.submitAvatar;
//профайл
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnSubmitProfile = formProfile.elements.submitProfile;
//новая карточка
const btnAddCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_new-place");
const inputPlace = formPlace.place;
const inputImage = formPlace.link;
const btnSubmitPlace = formPlace.elements.submitPlace;

document.addEventListener("DOMContentLoaded", () => {
  popupProfile.classList.add("popupTransitions");
  popupNewCard.classList.add("popupTransitions");
  popupImage.classList.add("popupTransitions");
  popupEditAvatar.classList.add("popupTransitions");
  popupAgreeDelete.classList.add("popupTransitions");
});

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-19",
  headers: {
    authorization: "858c7cb6-e0c3-4a29-bdeb-66efeccdb118",
    "Content-Type": "application/json",
  },
});

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error-message",
  errorVisibleClass: "form__input-error-message_active",
};

const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();

const formPlaceValidator = new FormValidator(validationConfig, formPlace);
formPlaceValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationConfig, formAvatar);
formAvatarValidator.enableValidation();

function updateUserData(userData) {
  profileName.textContent = userData.name;
  profileJob.textContent = userData.about;
}

function updateAvatar(userData) {
  avatar.src = userData.avatar;
}

function loadInitialUserData(userData) {
  updateUserData(userData);
  updateAvatar(userData);
  setCurrentUserId(userData._id);
}

function loadCards(cardsArr) {
  cardsArr.reverse().forEach((cardElement) => {
    renderCard(cardElement);
  });
}

const renderInitialData = () => {
  Promise.all([api.getUserData(), api.getCards()])
    .then(([userData, cardsArr]) => {
      loadInitialUserData(userData);
      loadCards(cardsArr);
    })
    .catch((err) => {
      console.log(
        `Ошибка при загрузке данных пользователя с сервера: ${err.message}`
      );
    });
};
renderInitialData();

function submitProfileForm(evt) {
  evt.preventDefault();
  showPreloader(btnSubmitProfile);

  api
    .patchProfile(nameInput.value, jobInput.value)
    .then((newUserData) => {
      updateUserData(newUserData);
      //closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(
        `Ошибка при отправке обновленных данных пользователя: ${err.message}`
      );
    })
    .finally(() => {
      hidePreloader(btnSubmitProfile);
    });
}

function submitNewCard(evt) {
  evt.preventDefault();
  showPreloader(btnSubmitPlace);

  api
    .postCard(inputPlace.value, inputImage.value)
    .then((newCardData) => {
      //closePopup(popupNewCard);
      renderCard(newCardData);
      formPlace.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при отправке карточки на сервер: ${err.message}`);
    })
    .finally(() => {
      hidePreloader(btnSubmitPlace);
    });
}

// function submitNewAvatar(evt) {
//   evt.preventDefault();
//   showPreloader(btnSubmitAvatar);

//   api
//     .patchAvatar(inputAvatar.value)
//     .then((newAvatarURL) => {
//       updateAvatar(newAvatarURL);
//       //closePopup(popupEditAvatar);
//       formAvatar.reset();
//     })
//     .catch((err) => {
//       console.log(`Ошибка при отправке URL аватара на сервер: ${err.message}`);
//     })
//     .finally(() => {
//       hidePreloader(btnSubmitAvatar);
//     });
// }

// formAvatar.addEventListener("submit", submitNewAvatar);
formProfile.addEventListener("submit", submitProfileForm);
formPlace.addEventListener("submit", submitNewCard);

closeButtons.forEach((closeButtonElement) => {
  const popupOpened = closeButtonElement.closest(".popup");
  //closeButtonElement.addEventListener("click", () => closePopup(popupOpened));
});

//аватар
btnAvatarEdit.addEventListener("click", () => {
  formAvatarValidator.resetErrorOnReOpen();
  formAvatarValidator.disableSubmitBtnOnOpen(btnSubmitAvatar);
  avatarPopup.open();
});

//профайл
btnEditProfile.addEventListener("click", () => {
  formProfileValidator.resetErrorOnReOpen();
  formProfileValidator.disableSubmitBtnOnOpen(btnSubmitProfile);
  openProfilePopup();
});

//новая карточка
btnAddCard.addEventListener("click", () => {
  formPlace.reset();
  formPlaceValidator.resetErrorOnReOpen();
  formPlaceValidator.disableSubmitBtnOnOpen(btnSubmitPlace);
  //openPopup(popupNewCard);
});
