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
const btnSubmitPlace = formPlace.elements.submitPlace;

const popupImagePicture = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImageCloseBtn = document.querySelector(".popup__btn-close_image");

document.addEventListener("DOMContentLoaded", () => {
  popupProfile.classList.add("popupTransitions");
  popupNewPlace.classList.add("popupTransitions");
  popupImage.classList.add("popupTransitions");
});

enableValidation();

const popupArr = document.querySelectorAll(".popup");
document.addEventListener("keydown", (evt) => {
  validateEscOnPopup(evt);
});

function addClickEventOnElement(selector, callBackFn) {
  document.querySelector(selector).addEventListener("click", callBackFn);
}

function submitProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupProfile);
}

function submitNewCard(evt) {
  evt.preventDefault();

  closePopup(popupNewPlace);

  renderCard({ name: inputPlace.value, link: inputImage.value });

  formPlace.reset();

  // setSubmitBtnState(true, btnSubmitPlace);
}

initialCards.forEach(renderCard);
formProfile.addEventListener("submit", submitProfileForm);
formPlace.addEventListener("submit", submitNewCard);

addClickEventOnElement(".profile__edit-button", () => openProfilePopup());
addClickEventOnElement(".popup__btn-close_profile", () =>
  closePopup(popupProfile)
);
addClickEventOnElement(".profile__add-button", () => openPopup(popupNewPlace));
addClickEventOnElement(".popup__btn-close_place", () =>
  closePopup(popupNewPlace)
);
addClickEventOnElement(".photo-elements__image", () => openPopup(popupImage));
addClickEventOnElement(".popup__btn-close_image", () => closePopup(popupImage));

popupProfile.addEventListener("click", (evt) => {
  closePopupOnOverlayClick(evt, popupProfile);
});

popupNewPlace.addEventListener("click", (evt) => {
  closePopupOnOverlayClick(evt, popupNewPlace);
});

popupImage.addEventListener("click", (evt) => {
  closePopupOnOverlayClick(evt, popupImage);
});
