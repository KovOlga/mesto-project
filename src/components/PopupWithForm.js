import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, { handleSubmit }) {
    super(popupElement);
    this._form = this.popupElement.querySelector(".form");
    this._handleSubmit = handleSubmit;

    this._submitHandler = this._submitHandler.bind(this);
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
    this._handleSubmit(this._getInputValues()).then(this.close());
  }

  close() {
    super.close();
    this._form.removeEventListener("submit", this._submitHandler);
    this._form.reset();
  }
}
