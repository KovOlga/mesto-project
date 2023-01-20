import "../pages/index.css";

import {
  initialCards,
  popupImage,
  formProfile,
  formPlace,
  popupProfile,
  profileName,
  profileJob,
  nameInput,
  jobInput,
} from "./data.js";
import { openPopup, openProfilePopup, closePopup } from "./modal";
import { renderCard } from "./card.js";
import {
  enableValidation,
  resetErrorOnOpen,
  disableSubmitBtnOnReopen,
} from "./validate.js";

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
console.log(enableValidation);

function submitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupProfile);
}

function submitNewCard(evt) {
  evt.preventDefault();

  closePopup(popupNewPlace);

  renderCard().addCard({ name: inputPlace.value, link: inputImage.value });

  formPlace.reset();
}

initialCards.forEach(function (cardElement) {
  renderCard().addCard(cardElement);
});
formProfile.addEventListener("submit", submitProfileForm);
formPlace.addEventListener("submit", submitNewCard);

btnEditProfile.addEventListener("click", () => {
  resetErrorOnOpen(formProfile);
  disableSubmitBtnOnReopen(formProfile.elements.submitProfile);
  openProfilePopup();
});

btnCloseProfile.addEventListener("click", () => closePopup(popupProfile));

btnAddCard.addEventListener("click", () => {
  resetErrorOnOpen(formPlace);
  disableSubmitBtnOnReopen(formPlace.elements.submitPlace);
  openPopup(popupNewPlace);
});

btnClosePopupNewCard.addEventListener("click", () => closePopup(popupNewPlace));

btnClosePopupImage.addEventListener("click", () => closePopup(popupImage));
