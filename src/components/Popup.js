export default class Popup {

  constructor(popupElement) {
    this.popupElement = popupElement;
    
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);

  }

  open() {
    this.popupElement.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this.popupElement.classList.remove('popup_opened');
    
    document.removeEventListener("keydown", this._handleEscClose);
    
    this.popupElement.querySelector('.popup__btn-close').removeEventListener("click", this.close);

    this.popupElement.removeEventListener("mousedown", this._handleOverlayClose);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);

    this.popupElement.querySelector('.popup__btn-close').addEventListener("click", this.close);

    this.popupElement.addEventListener("mousedown", this._handleOverlayClose);
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