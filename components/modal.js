function hideInputErrorOnReopen(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error-message_active");
  errorElement.textContent = "";
}

function resetErrorOnOpen(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
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
