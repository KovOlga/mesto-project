import { formProfile, formPlace } from "./data.js";
import { closePopup, closePopupOnOverlayClick } from "./modal.js";

function hideInputErrorOnReopen(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error-message_active");
  errorElement.textContent = "";
}

function resetErrorOnOpen(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));

  inputList.forEach((inputElement) => {
    hideInputErrorOnReopen(formElement, inputElement);
  });
}

function disableSubmitBtnOnReopen(btnElement) {
  btnElement.setAttribute("disabled", true);
  btnElement.classList.add("form__submit-btn_disabled");
}

function openPopup(openElement) {
  if (openElement.classList.contains("popup_profile")) {
    resetErrorOnOpen(formProfile);
    disableSubmitBtnOnReopen(formProfile.elements.submitProfile);
  }
  if (openElement.classList.contains("popup_new-place")) {
    formPlace.reset();
    resetErrorOnOpen(formPlace);
    disableSubmitBtnOnReopen(formPlace.elements.submitPlace);
  }

  openElement.addEventListener("click", (evt) =>
    closePopupOnOverlayClick(evt, openElement)
  );

  document.addEventListener("keydown", closePopupOnEsc);

  openElement.classList.add("popup_opened");
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const popupArr = document.querySelectorAll(".popup");
    popupArr.forEach((popupElement) => {
      if (popupElement.classList.contains("popup_opened")) {
        closePopup(popupElement);
        document.removeEventListener("keydown", closePopupOnEsc);
      }
    });
  }
}

export { openPopup };
