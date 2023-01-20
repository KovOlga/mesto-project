const enableValidation = function (customClassHolder) {
  const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "fpopup__input_type_error",
    errorClass: "popup__error",
    errorVisibleClass: "popup__error_visible",
  };

  for (const key of Object.keys(customClassHolder)) {
    if (customClassHolder[key]) {
      validationConfig[key] = customClassHolder[key];
    }
  }

  return {
    enableForms: function () {
      const formList = Array.from(
        document.querySelectorAll(validationConfig.formSelector)
      );
      formList.forEach((formElement) => {
        this.setEventListeners(formElement);
      });
    },

    setEventListeners: function (formElement) {
      const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector)
      );
      const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector
      );
      this.setSubmitBtnState(inputList, buttonElement);

      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this.isValid(formElement, inputElement);
          this.setSubmitBtnState(inputList, buttonElement);
        });
      });
    },

    isValid: function (formElement, inputElement) {
      if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
        inputElement.setCustomValidity("");
      }

      if (!inputElement.validity.valid) {
        this.showInputError(
          formElement,
          inputElement,
          inputElement.validationMessage
        );
      } else {
        this.hideInputError(formElement, inputElement);
      }
    },

    hasInvalidInput: function (inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    },

    setSubmitBtnState: function (inputList, buttonElement) {
      if (this.hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
      } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      }
    },

    showInputError: function (formElement, inputElement, errorMessage) {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );

      inputElement.classList.add(validationConfig.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(validationConfig.errorVisibleClass);
    },

    hideInputError: function (formElement, inputElement) {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );

      inputElement.classList.remove(validationConfig.inputErrorClass);
      errorElement.classList.remove(validationConfig.errorVisibleClass);
      errorElement.textContent = "";
    },

    resetErrorOnOpen: function (formElement) {
      const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector)
      );

      inputList.forEach((inputElement) => {
        this.hideInputError(formElement, inputElement);
      });
    },

    disableSubmitBtnOnReopen: function (btnElement) {
      btnElement.setAttribute("disabled", true);
      btnElement.classList.add(validationConfig.inactiveButtonClass);
    },
  };
};

export { enableValidation };
