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
    this._popup = popupElement;
    this._closeButton = this._popup.querySelector(".popup__btn-close");
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", function () {
      this.close();
    });
    
    this._popup.addEventListener("mousedown", function (evt) {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    document.addEventListener("keydown", function () {
      this._handleEscClose(evt);
    });
  }
  /*Не уверен, что метод будет работать в таком виде
  Возможно, придётся пихать функцию в него*/
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}

export class PopupWithImage extends Popup {
  open() {
    const image = this._popup.querySelector("popup__image");
    const caption = this._popup.querySelector("popup__caption");
    /*Подстановку актуальных данных наверняка следует выполнить по-другому
    Не уверен, что мой код вообще сработает*/
    (evt) => {
      image.setAttribute("src", evt.target.src);
      image.setAttribute("alt", evt.target.alt);
      caption.textContent = evt.target.alt;
    }
    this._popup.classList.add("popup_opened");
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
    this._closeButton.addEventListener("click", function () {
      this.close();
    });
    
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
