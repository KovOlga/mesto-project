import {
  profileName,
  profileJob,
  popupProfile,
  nameInput,
  jobInput,
  formProfile
} from "./data.js";

export class Popup {

  constructor(popupElement) {
    this._popup = document.querySelector(popupElement);
    this._closeButton = this._popup.querySelector('.popup__btn-close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose);
    
    this._closeButton.removeEventListener("click", () => {
      this.close();
    });

    this._popup.removeEventListener("mousedown", this._handleOverlayClose);
  }

  setEventListeners() {
    
    document.addEventListener("keydown", this._handleEscClose);

    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("mousedown", this._handleOverlayClose);
  }

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    };
  };
}

export class PopupWithImage extends Popup {
  constructor (popupElement) {
    super(popupElement);
    this._image = document.querySelector(".popup__image");
    this._caption = document.querySelector(".popup__caption");
  }
  
  open(link, name) {
    super.open();
    /*Подстановку актуальных данных наверняка следует выполнить по-другому
    Писал код, основываясь на своём проекте!*/
      this._image.setAttribute("src", link);
      this._image.setAttribute("alt", name);
      this._caption.textContent = name;
  }
}



export class PopupWithForm extends Popup {
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



export { openPopup, openProfilePopup, closePopup };
