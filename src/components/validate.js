const enableValidation = function (customClassHolder) {
  const classHolder = {
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
      classHolder[key] = customClassHolder[key];
    }
  }

  return {
    enableForms: function () {
      const formList = Array.from(
        document.querySelectorAll(classHolder.formSelector)
      );
      formList.forEach((formElement) => {
        this.setEventListeners(formElement);
      });
    },

    setEventListeners: function (formElement) {
      const inputList = Array.from(
        formElement.querySelectorAll(classHolder.inputSelector)
      );
      const buttonElement = formElement.querySelector(
        classHolder.submitButtonSelector
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
        buttonElement.classList.add(classHolder.inactiveButtonClass);
      } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(classHolder.inactiveButtonClass);
      }
    },

    showInputError: function (formElement, inputElement, errorMessage) {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );

      inputElement.classList.add(classHolder.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(classHolder.errorVisibleClass);
    },

    hideInputError: function (formElement, inputElement) {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );

      inputElement.classList.remove(classHolder.inputErrorClass);
      errorElement.classList.remove(classHolder.errorVisibleClass);
      errorElement.textContent = "";
    },
  };
};

export { enableValidation };
