const formValidation = function (customClassHolder) {
  const classHolder = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-btn",
    inactiveButtonClass: "form__submit-btn_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error-message",
    errorVisibleClass: "form__input-error-message_active",
  };

  // function rewriteClasses(customClassHolder) {
  for (const key of Object.keys(customClassHolder)) {
    if (customClassHolder[key]) {
      classHolder[key] = customClassHolder[key];
    }
  }
  // }

  return {
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

    isValid: function (formElement, inputElement) {
      if (inputElement.value.length === 0) {
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
    // resetErrorOnOpen: function (formElement) {
    //   const inputList = Array.from(
    //     formElement.querySelectorAll(classHolder.inputSelector)
    //   );

    //   inputList.forEach((inputElement) => {
    //     hideInputError(formElement, inputElement);
    //   });
    // },

    setSubmitBtnState: function (inputList, buttonElement) {
      if (this.hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(classHolder.inactiveButtonClass);
      } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(classHolder.inactiveButtonClass);
      }
    },

    setEventListeners: function (formElement) {
      const inputList = Array.from(
        formElement.querySelectorAll(classHolder.inputSelector)
      );
      const buttonElement = formElement.querySelector(
        classHolder.inputSelector
      );
      this.setSubmitBtnState(inputList, buttonElement);

      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this.isValid(formElement, inputElement);
          this.setSubmitBtnState(inputList, buttonElement);
        });
      });
    },

    enableValidation: function () {
      const formList = Array.from(
        document.querySelectorAll(classHolder.formSelector)
      );
      formList.forEach((formElement) => {
        this.setEventListeners(formElement);
      });
    },
  };
};
