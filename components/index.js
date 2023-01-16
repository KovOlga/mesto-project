import { initialCards } from "./data.js";
import { renderCard } from "./card.js";
import { popupFunctionality } from "./modal.js";
import { formValidation } from "./validate.js";

const popupProfile = document.querySelector(".popup_profile");
const popupNewPlace = document.querySelector(".popup_new-place");
const popupImage = document.querySelector(".popup_image-window");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const formProfile = document.forms.profile;
const nameInput = formProfile.name;
const jobInput = formProfile.job;

const photoElementsGallery = document.querySelector(".photo-elements__list");
const photoCardTemplateContent = document.querySelector(
  "#photo-cards-template"
).content;

const formPlace = document.forms.card;
const inputPlace = formPlace.place;
const inputImage = formPlace.link;

const popupImagePicture = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

document.addEventListener("DOMContentLoaded", () => {
  popupProfile.classList.add("popupTransitions");
  popupNewPlace.classList.add("popupTransitions");
  popupImage.classList.add("popupTransitions");
});

formValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error-message",
  errorVisibleClass: "form__input-error-message_active",
}).enableValidation();

const popupArr = document.querySelectorAll(".popup");
document.addEventListener("keydown", (evt) => {
  popupFunctionality.validateEscOnPopup(evt);
});

function addClickEventOnElement(selector, callBackFn) {
  document.querySelector(selector).addEventListener("click", callBackFn);
}

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
addClickEventOnElement(".profile__add-button", () =>
  popupFunctionality.openPopup(popupNewPlace)
);
addClickEventOnElement(".popup__btn-close_place", () =>
  popupFunctionality.closePopup(popupNewPlace)
);
addClickEventOnElement(".photo-elements__image", () =>
  popupFunctionality.openPopup(popupImage)
);
addClickEventOnElement(".popup__btn-close_image", () =>
  popupFunctionality.closePopup(popupImage)
);

popupProfile.addEventListener("click", (evt) => {
  popupFunctionality.closePopupOnOverlayClick(evt, popupProfile);
});

popupNewPlace.addEventListener("click", (evt) => {
  popupFunctionality.closePopupOnOverlayClick(evt, popupNewPlace);
});

popupImage.addEventListener("click", (evt) => {
  popupFunctionality.closePopupOnOverlayClick(evt, popupImage);
});
