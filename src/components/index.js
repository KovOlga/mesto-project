import "../pages/index.css";

import {
  getCards,
  getUserData,
  patchAvatar,
  patchProfile,
  postCard,
} from "./api.js";
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
import { openPopup, openProfilePopup, closePopup } from "./modal.js";
import { renderCard, setCurrentUserId } from "./card.js";
import {
  enableValidation,
  resetErrorOnReOpen,
  disableSubmitBtnOnReopen,
} from "./validate.js";

//аватар
const avatar = document.querySelector(".profile__avatar");
const btnAvatarEdit = document.querySelector(".profile__avatar-container");
const popupEditAvatar = document.querySelector(".popup_edit-avatar");
const btnClosePopupAvatarEdit = document.querySelector(
  ".popup__btn-close_avatar"
);
const formAvatar = document.forms.avatar;
const inputAvatar = formAvatar.elements.avatar;
const btnSubmitAvatar = formAvatar.elements.submitAvatar;
//профайл
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnClosePopupProfile = document.querySelector(
  ".popup__btn-close_profile"
);
const btnSubmitProfile = formProfile.elements.submitProfile;
//новая карточка
const btnAddCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_new-place");
const btnClosePopupNewCard = document.querySelector(".popup__btn-close_place");
const inputPlace = formPlace.place;
const inputImage = formPlace.link;
const btnSubmitPlace = formPlace.elements.submitPlace;
//попап фото
const btnClosePopupImage = document.querySelector(".popup__btn-close_image");
//попап согласия на удаление
const btnClosePopupAgree = document.querySelector(".popup__btn-close_agree");

document.addEventListener("DOMContentLoaded", () => {
  popupProfile.classList.add("popupTransitions");
  popupNewCard.classList.add("popupTransitions");
  popupImage.classList.add("popupTransitions");
  popupEditAvatar.classList.add("popupTransitions");
  popupAgreeDelete.classList.add("popupTransitions");
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
}

function updateAvatar(user) {
  avatar.src = user.avatar;
}

function loadInitialUserData(user) {
  updateUserData(user);
  updateAvatar(user);
  setCurrentUserId(user._id);
}

function loadCards(cardsArr) {
  cardsArr.forEach((cardElement) => {
    renderCard(cardElement);
  });
}

const renderInitialData = () => {
  getUserData()
    .then((data) => {
      loadInitialUserData(data);
      return data;
    })
    .then(() => {
      getCards()
        .then((cardsArr) => {
          loadCards(cardsArr);
        })
        .catch((err) => {
          console.log(`Ошибка при загрузке карточек с сервера: ${err.message}`);
        });
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

  patchProfile(nameInput.value, jobInput.value)
    .then((newCardData) => {
      updateUserData(newCardData);
      closePopup(popupProfile);
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

  postCard(inputPlace.value, inputImage.value)
    .then((newCardData) => {
      closePopup(popupNewCard);
      console.log(newCardData);
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

function submitNewAvatar(evt) {
  evt.preventDefault();
  showPreloader(btnSubmitAvatar);

  patchAvatar(inputAvatar.value)
    .then((newAvatarURL) => {
      console.log(newAvatarURL);
      updateAvatar(newAvatarURL);
      closePopup(popupEditAvatar);
      formAvatar.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при отправке URL аватара на сервер: ${err.message}`);
    })
    .finally(() => {
      hidePreloader(btnSubmitAvatar);
    });
}

formAvatar.addEventListener("submit", submitNewAvatar);
formProfile.addEventListener("submit", submitProfileForm);
formPlace.addEventListener("submit", submitNewCard);

//аватар
btnAvatarEdit.addEventListener("click", () => {
  formAvatar.reset();
  resetErrorOnReOpen(popupEditAvatar);
  disableSubmitBtnOnReopen(formAvatar.elements.submitAvatar);
  openPopup(popupEditAvatar);
});
btnClosePopupAvatarEdit.addEventListener("click", () =>
  closePopup(popupEditAvatar)
);

//профайл
btnEditProfile.addEventListener("click", () => {
  resetErrorOnReOpen(formProfile);
  disableSubmitBtnOnReopen(formProfile.elements.submitProfile);
  openProfilePopup();
});
btnClosePopupProfile.addEventListener("click", () => closePopup(popupProfile));
//новая карточка
btnAddCard.addEventListener("click", () => {
  formPlace.reset();
  resetErrorOnReOpen(formPlace);
  disableSubmitBtnOnReopen(formPlace.elements.submitPlace);
  openPopup(popupNewCard);
});
btnClosePopupNewCard.addEventListener("click", () => closePopup(popupNewCard));
//попап фото
btnClosePopupImage.addEventListener("click", () => closePopup(popupImage));
//попап согласия на удаление
btnClosePopupAgree.addEventListener("click", () => {
  closePopup(popupAgreeDelete);
});
