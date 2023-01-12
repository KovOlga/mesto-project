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
const placeSubmitBtn = formPlace.elements.submitPlace;

const popupImagePicture = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImageCloseBtn = document.querySelector(".popup__btn-close_image");

document.addEventListener("DOMContentLoaded", () => {
  popupProfile.classList.add("popupTransitions");
  popupNewPlace.classList.add("popupTransitions");
  popupImage.classList.add("popupTransitions");
});

function openPopup(openElement) {
  openElement.classList.add("popup_opened");
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

function closePopup(closElement) {
  closElement.classList.remove("popup_opened");
}

function closePopupOnOverlayClick(evt, closElement) {
  if (evt.target === evt.currentTarget) {
    closePopup(closElement);
  }
}

////////////////////////

function setSubmitBtnState(isFormValid) {
  if (isFormValid) {
    placeSubmitBtn.removeAttribute("disabled");
    placeSubmitBtn.classList.remove("popup__form-save_disabled");
  } else {
    placeSubmitBtn.setAttribute("disabled", true);
    placeSubmitBtn.classList.add("popup__form-save_disabled");
  }
}

formPlace.addEventListener("input", function (evt) {
  const isInputValid = inputPlace.validity.valid && inputImage.validity.valid;
  setSubmitBtnState(isInputValid);
});

/////////////////////

const popupArr = document.querySelectorAll(".popup");

function closePopupOnEsc(evt, closElement) {
  if (evt.key === "Escape") {
    closePopup(closElement);
  }
}

function validateEscOnPopup(evt) {
  popupArr.forEach((element) => {
    if (element.classList.contains("popup_opened")) {
      closePopupOnEsc(evt, element);
    }
    console.log("uyf");
  });
}

document.addEventListener("keydown", (evt) => {
  validateEscOnPopup(evt);
});

/////////////////////

function addClickEventOnElement(selector, callBackFn) {
  document.querySelector(selector).addEventListener("click", callBackFn);
}

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

  setSubmitBtnState(false);
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
