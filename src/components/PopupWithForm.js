import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /*Пока не разобрался, как следует добавить колбэк в конструктор
  Наверное, говорится про метод Api.getUserData()*/
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() {
    console.log(this._form);
    /*Не понял, что значит "собирает данные всех полей формы"
    Записывает их в объект или что?*/
  }

  setEventListeners() {
    super.setEventListeners();

    /*this._form.addEventListener("submit", /*Пока не придумал, 
    как сделать общую логику сабмита для всех попапов с формами
    Их у нас 3: редактирование аватара, профиля и добавления новой карточки
    как класс должен понимать, какие именно данные надо редактировать?)*/
  }  

  close() {
    super.close();
    this._form.reset();
  }
}