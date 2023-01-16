import {
  profileName,
  profileJob,
  popupProfile,
  nameInput,
  jobInput,
} from "./data.js";
import { openPopup } from "./utils.js";

const popupArr = document.querySelectorAll(".popup");

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

  closePopupOnEsc: function (evt, closElement) {
    if (evt.key === "Escape") {
      this.closePopup(closElement);
    }
  },

  validateEscOnPopup: function (evt) {
    popupArr.forEach((element) => {
      if (element.classList.contains("popup_opened")) {
        this.closePopupOnEsc(evt, element);
      }
    });
  },
};

export { popupFunctionality };
