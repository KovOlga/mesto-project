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
import { openPopup } from "./utils.js";
import { renderCard } from "./card.js";
import { popupFunctionality } from "./modal.js";
import { enableValidation } from "./validate.js";

const popupNewPlace = document.querySelector(".popup_new-place");
const inputPlace = formPlace.place;
const inputImage = formPlace.link;

function addClickEventOnElement(selector, callBackFn) {
  document.querySelector(selector).addEventListener("click", callBackFn);
}

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
}).enableForms();

function submitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupFunctionality.closePopup(popupProfile);
}

function submitNewCard(evt) {
  evt.preventDefault();

  popupFunctionality.closePopup(popupNewPlace);

  renderCard().addCard({ name: inputPlace.value, link: inputImage.value });

  formPlace.reset();
}

initialCards.forEach(function (cardElement) {
  renderCard().addCard(cardElement);
});
formProfile.addEventListener("submit", submitProfileForm);
formPlace.addEventListener("submit", submitNewCard);

addClickEventOnElement(".profile__edit-button", () =>
  popupFunctionality.openProfilePopup()
);
addClickEventOnElement(".popup__btn-close_profile", () =>
  popupFunctionality.closePopup(popupProfile)
);

addClickEventOnElement(".profile__add-button", () => openPopup(popupNewPlace));
addClickEventOnElement(".popup__btn-close_place", () =>
  popupFunctionality.closePopup(popupNewPlace)
);

addClickEventOnElement(".photo-elements__image", () => openPopup(popupImage));
addClickEventOnElement(".popup__btn-close_image", () =>
  popupFunctionality.closePopup(popupImage)
);
