import {
  profileName,
  profileJob,
  popupProfile,
  nameInput,
  jobInput,
} from "./data.js";
import { openPopup } from "./utils.js";

const popupFunctionality = {
  openProfilePopup: function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupProfile);
  },

  closePopup: function (closElement) {
    closElement.classList.remove("popup_opened");
  },

  closePopupOnOverlayClick: function (evt, closElement) {
    if (evt.target === evt.currentTarget) {
      this.closePopup(closElement);
    }
  },

  closePopupOnEsc: function (popupElement) {
    if (popupElement.classList.contains("popup_opened")) {
      this.closePopup(popupElement);
    }
  },

  validateEscOnPopup: function (evt) {
    if (evt.key === "Escape") {
      const popupArr = document.querySelectorAll(".popup");
      popupArr.forEach((popupElement) => {
        this.closePopupOnEsc(popupElement);
      });
    }
  },
};

export { popupFunctionality };
