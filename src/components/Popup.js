export default class Popup {

  constructor(popupElement) {
    this._popup = popupElement;
    this._closeButton = this._popup.querySelector('.popup__btn-close');
    
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);

  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    
    document.removeEventListener("keydown", this._handleEscClose);
    
    this._closeButton.removeEventListener("click", this.close);

    this._popup.removeEventListener("mousedown", this._handleOverlayClose);
  }

  setEventListeners() {
    
    document.addEventListener("keydown", this._handleEscClose);

    this._closeButton.addEventListener("click", this.close);

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