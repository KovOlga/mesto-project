import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /*Пока не разобрался, как следует добавить колбэк в конструктор
  Наверное, говорится про метод Api.getUserData()*/
  constructor(popupElement, {handleSubmit}) {
    super(popupElement);
    this._form = this._popup.querySelector('.form');
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    console.log(this._form);
    /*Не понял, что значит "собирает данные всех полей формы"
    Записывает их в объект или что?*/
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", this._submitHandler);
  }  

  _submitHandler(evt) {
    evt.preventDefault();
    
  }

  close() {
    super.close();
    this._form.removeEventListener("submit", this._submitHandler);
    this._form.reset();
  }
}