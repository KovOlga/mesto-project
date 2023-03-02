import "../pages/index.css";
import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupAgreement from "./PopupAgreement.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";
import Api from "./Api.js";
import { showPreloader, hidePreloader } from "../utils/utils.js";
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
} from "../utils/data.js";

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
const btnSubmitPlace = formPlace.elements.submitPlace;

// попап с картинкой
const popupImagePicture = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

// попап с подтверждением удаления
const btnAgreeDelete = document.querySelector(".popup__btn-agree");

let currentUserId;

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

const user = new UserInfo({
  profileName: profileName,
  profileJob: profileJob,
  avatar: avatar,
});

const avatarPopup = new PopupWithForm(popupEditAvatar, {
  handleSubmitForm: ({ avatar }) => {
    return api.patchAvatar(avatar).then((res) => {
      user.setUserInfo(res);
    });
  },
  showLoader: () => {
    showPreloader(btnSubmitAvatar);
  },
  hideLoader: () => {
    hidePreloader(btnSubmitAvatar);
  },
});
avatarPopup.setEventListeners();

const profilePopup = new PopupWithForm(popupProfile, {
  handleSubmitForm: ({ name, job }) => {
    return api.patchProfile(name, job).then((res) => {
      user.setUserInfo(res);
    });
  },
  showLoader: () => {
    showPreloader(btnSubmitProfile);
  },
  hideLoader: () => {
    hidePreloader(btnSubmitProfile);
  },
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(popupNewCard, {
  handleSubmitForm: ({ place, link }) => {
    return api.postCard(place, link).then((newCardData) => {
      cardList.renderNewItem(newCardData);
    });
  },
  showLoader: () => {
    showPreloader(btnSubmitPlace);
  },
  hideLoader: () => {
    hidePreloader(btnSubmitPlace);
  },
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage(
  popupImage,
  popupImagePicture,
  popupImageCaption
);
imagePopup.setEventListeners();

const agreementPopup = new PopupAgreement({
  popup: popupAgreeDelete,
  btnAgreeDelete: btnAgreeDelete,
  handleCardDelete: (binBtnTarget, cardId) => {
    return api
      .deleteCard(cardId)
      .then(() => {
        agreementPopup.close();
        binBtnTarget.closest(".photo-elements__item").remove();
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки: ${err.message}`);
      });
  },
});
agreementPopup.setEventListeners();

function setUserId(userId) {
  currentUserId = userId;
}

const cardList = new Section({
  items: [],
  renderer: (item) => {
    const newCard = new Card(item, "#photo-cards-template", currentUserId, {
      putLike: (cardId) => {
        return api.putLike(cardId);
      },
      deleteLike: (cardId) => {
        return api.deleteLike(cardId);
      },
      handleCardDelete: (binBtnTarget, cardId) => {
        agreementPopup.open(binBtnTarget, cardId);
      },
      handleImageClick: (name, link) => {
        imagePopup.open(name, link);
      },
    });
    const cardElement = newCard.generate();
    cardList.addItem(cardElement);
  },
  containerSelector: ".photo-elements__list",
});

const renderInitialData = () => {
  Promise.all([api.getUserData(), api.getCards()])
    .then(([userData, cardsArr]) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      avatar.src = userData.avatar;
      setUserId(userData._id);
      user.setUserInfo(userData);
      cardList.renderItems(cardsArr);
    })
    .catch((err) => {
      console.log(
        `Ошибка при загрузке данных пользователя с сервера: ${err.message}`
      );
    });
};
renderInitialData();

//аватар
btnAvatarEdit.addEventListener("click", () => {
  formAvatar.reset();
  formAvatarValidator.resetErrorOnReOpen();
  formAvatarValidator.disableSubmitBtnOnOpen(btnSubmitAvatar);
  avatarPopup.open();
});

//профайл
btnEditProfile.addEventListener("click", () => {
  const { name, about } = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  formProfileValidator.resetErrorOnReOpen();
  formProfileValidator.disableSubmitBtnOnOpen(btnSubmitProfile);
  profilePopup.open();
});

//новая карточка
btnAddCard.addEventListener("click", () => {
  formPlace.reset();
  formPlaceValidator.resetErrorOnReOpen();
  formPlaceValidator.disableSubmitBtnOnOpen(btnSubmitPlace);
  cardPopup.open();
});
