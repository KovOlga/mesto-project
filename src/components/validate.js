const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "fpopup__input_type_error",
  errorClass: "popup__error",
  errorVisibleClass: "popup__error_visible",
};

function enableValidation(customClassHolder) {
  for (const key of Object.keys(customClassHolder)) {
    if (customClassHolder[key]) {
      validationConfig[key] = customClassHolder[key];
    }
  }
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  setSubmitBtnState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      setSubmitBtnState(inputList, buttonElement);
    });
  });
}

function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function setSubmitBtnState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorVisibleClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorVisibleClass);
  errorElement.textContent = "";
}

function resetErrorOnOpen(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

function disableSubmitBtnOnReopen(btnElement) {
  btnElement.setAttribute("disabled", true);
  btnElement.classList.add(validationConfig.inactiveButtonClass);
}

export { enableValidation, resetErrorOnOpen, disableSubmitBtnOnReopen };
