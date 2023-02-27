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
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    
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
    this._image = document.querySelector(".image-popup__image");
    this._caption = document.querySelector(".image-popup__title");
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
  }

  _getInputValues() {
    /*Не понял, что значит "собирает данные всех полей формы"
    Записывает их в объект или что?*/
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popup.addEventListener("mousedown", function (evt) {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    document.addEventListener("keydown", function () {
      this._handleEscClose(evt);
    });

    formProfile.addEventListener("submit", /*Пока не придумал, 
    как сделать общую логику сабмита для всех попапов с формами
    Их у нас 3: редактирование аватара, профиля и добавления новой карточки
    как класс должен понимать, какие именно данные надо редактировать?*/)
  }  

  close() {
    this._popup.classList.remove("popup_opened");
    formProfile.reset();
  }
}



function openPopup(popupElement) {
  document.addEventListener("keydown", closePopupOnEsc);
  popupElement.addEventListener("mousedown", closePopupOnOverlayClick);
  popupElement.classList.add("popup_opened");
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupOnEsc);
  popupElement.removeEventListener("mousedown", closePopupOnOverlayClick);
}

function closePopupOnOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

export { openPopup, openProfilePopup, closePopup };
