import {
  profileName,
  profileJob,
  popupProfile,
  nameInput,
  jobInput,
} from "./data.js";
import { openPopup } from "./utils.js";

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

function closePopup(closElement) {
  closElement.classList.remove("popup_opened");
}

function closePopupOnOverlayClick(evt, popupElement) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupElement);
  }
}

export { openProfilePopup, closePopup, closePopupOnOverlayClick };
