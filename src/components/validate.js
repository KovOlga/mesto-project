function enableValidation(classSettings) {
  const formList = Array.from(
    document.querySelectorAll(classSettings.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, classSettings);
  });
}

function setEventListeners(formElement, classSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(classSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    classSettings.submitButtonSelector
  );
  setSubmitBtnState(inputList, buttonElement, classSettings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, classSettings);
      setSubmitBtnState(inputList, buttonElement, classSettings);
    });
  });
}

function isValid(formElement, inputElement, classSettings) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      classSettings
    );
  } else {
    hideInputError(formElement, inputElement, classSettings);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function setSubmitBtnState(inputList, buttonElement, classSettings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(classSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(classSettings.inactiveButtonClass);
  }
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  classSettings
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(classSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classSettings.errorVisibleClass);
}

function hideInputError(formElement, inputElement, classSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(classSettings.inputErrorClass);
  errorElement.classList.remove(classSettings.errorVisibleClass);
  errorElement.textContent = "";
}

function resetErrorOnReOpen(formElement, classSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(classSettings.inputSelector)
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, classSettings);
  });
}

function disableSubmitBtnOnOpen(btnElement, classSettings) {
  btnElement.setAttribute("disabled", true);
  btnElement.classList.add(classSettings.inactiveButtonClass);
}

export { enableValidation, resetErrorOnReOpen, disableSubmitBtnOnOpen };
