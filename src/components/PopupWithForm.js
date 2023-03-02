import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, { handleSubmit, showLoader, hideLoader }) {
    super(popupElement);
    this._form = this.popupElement.querySelector(".form");
    this._handleSubmit = handleSubmit;
    this._submitHandler = this._submitHandler.bind(this);
    this.showLoader = showLoader;
    this.hideLoader = hideLoader;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", this._submitHandler);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this.showLoader();
    this._handleSubmit(this._getInputValues())
      .then(this.close())
      .then(this._form.reset())
      .catch((err) => {
        console.log(
          `Ошибка при отправке обновленных данных пользователя: ${err.message}`
        );
      })
      .finally(() => {
        this.hideLoader();
      });
  }

  close() {
    super.close();
    this._form.removeEventListener("submit", this._submitHandler);
  }
}
