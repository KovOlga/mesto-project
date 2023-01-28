import {
  profileName,
  profileJob,
  popupProfile,
  nameInput,
  jobInput,
} from "./data.js";

function openPopup(popupElement) {
  document.addEventListener("keydown", closePopupOnEsc);
  popupElement.addEventListener("mousedown", closePopupOnOverlayClick);
  popupElement.classList.add("popup_opened");
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupOnEsc);
  popupElement.removeEventListener("mousedown", closePopupOnOverlayClick);
}

function closePopupOnOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

export { openPopup, openProfilePopup, closePopup };
