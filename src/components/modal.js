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

  closePopupOnOverlayClick: function (evt, popupElement) {
    if (evt.target === evt.currentTarget) {
      this.closePopup(popupElement);
    }
  },
};

export { popupFunctionality };
