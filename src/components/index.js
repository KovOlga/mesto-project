import "../pages/index.css";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
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
} from "./data.js";

import {   renderCard,
  setCurrentUserId,
  createCardElement,
  photoElementsGallery, } from "./card";

import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm";

//аватар
const avatar = document.querySelector(".profile__avatar");
const btnAvatarEdit = document.querySelector(".profile__avatar-container");
const popupEditAvatar = document.querySelector(".popup_edit-avatar");
const formAvatar = document.forms.avatar;
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

const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileJob,
  avatarSelector: avatar,
  getUserData: () => {
    return api.getUserData();
  },
  setUserData: (name, job) => {
    return api.patchProfile(name, job);
  },
  setNewAvatar: (newAvatarUrl) => {
    return api.patchAvatar(newAvatarUrl);
  },
});

export const imagePopup = new PopupWithImage(popupImage);

const avatarPopup = new PopupWithForm(popupEditAvatar, 
  {handleSubmit: ({avatar}) => {
    return userInfo.setAvatar(avatar);
}});

const profilePopup = new PopupWithForm(popupProfile, {
  handleSubmit: ({name, job}) => {
    return userInfo.setUserInfo(name, job);
}});

function renderInitialCards(cardsArr) {
  const cardList = new Section(
    {
      items: cardsArr,
      renderer: (item) => {
        const cardElement = createCardElement(item);
        cardList.addItem(cardElement);
      },
    },
    photoElementsGallery
  );
  cardList.renderItems();
}

const renderInitialData = () => {
  Promise.all([userInfo.getUserInfo(), api.getCards()])
    .then(([userData, cardsArr]) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      avatar.src = userData.avatar;
      setCurrentUserId(userData._id);
      renderInitialCards(cardsArr);
    })
    .catch((err) => {
      console.log(
        `Ошибка при загрузке данных пользователя с сервера: ${err.message}`
      );
    });
};
renderInitialData();

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

formPlace.addEventListener("submit", submitNewCard);

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
  profilePopup.open();
});

//новая карточка
btnAddCard.addEventListener("click", () => {
  formPlace.reset();
  formPlaceValidator.resetErrorOnReOpen();
  formPlaceValidator.disableSubmitBtnOnOpen(btnSubmitPlace);
  //openPopup(popupNewCard);
});