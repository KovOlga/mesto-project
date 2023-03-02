export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this.popup.classList.add("popup_opened");
  }

  close() {
    this.popup.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close(evt.target);
    }
  }

  setEventListeners() {
    this.popup
      .querySelector(".popup__btn-close")
      .addEventListener("click", this.close());

    document.addEventListener("keydown", this._handleEscClose);
    this.popup.addEventListener("mousedown", this._handleOverlayClose);
  }
}
