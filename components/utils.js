const formProfile = document.forms.profile;
const formPlace = document.forms.card;

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

function openPopup(openElement) {
  if (openElement.classList.contains("popup_profile")) {
    resetErrorOnOpen(formProfile);
  }
  if (openElement.classList.contains("popup_new-place")) {
    formPlace.reset();
    resetErrorOnOpen(formPlace);
  }
  openElement.classList.add("popup_opened");
}

export { openPopup };
