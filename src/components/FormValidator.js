export default class FormValidator {
  constructor(classSettings, formElement) {
    this.classSettings = classSettings;
    this.formElement = formElement;
  }

  enableValidation() {
    // const formList = Array.from(
    //   document.querySelectorAll(classSettings.formSelector)
    // );
    // formList.forEach((formElement) => {
    //   this.setEventListeners(formElement, classSettings);
    // });
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.classSettings.inputSelector)
    );

    const buttonElement = this.formElement.querySelector(
      this.classSettings.submitButtonSelector
    );
    this._setSubmitBtnState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._setSubmitBtnState(inputList, buttonElement);
      });
    });
  }

  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setSubmitBtnState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this.classSettings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.classSettings.inactiveButtonClass);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this.classSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.classSettings.errorVisibleClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this.classSettings.inputErrorClass);
    errorElement.classList.remove(this.classSettings.errorVisibleClass);
    errorElement.textContent = "";
  }

  //   resetErrorOnReOpen(formElement, classSettings) {
  //     const inputList = Array.from(
  //       formElement.querySelectorAll(classSettings.inputSelector)
  //     );

  //     inputList.forEach((inputElement) => {
  //       this.hideInputError(formElement, inputElement, classSettings);
  //     });
  //   }

  //   disableSubmitBtnOnOpen(btnElement, classSettings) {
  //     btnElement.setAttribute("disabled", true);
  //     btnElement.classList.add(classSettings.inactiveButtonClass);
  //   }
}
