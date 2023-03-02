export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this.popupSelector.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this.popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this.popupSelector.removeEventListener(
      "mousedown",
      this._handleOverlayClose
    );
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
    this.popupSelector
      .querySelector(".popup__btn-close")
      .addEventListener("click", () => {
        this.close();
      });

    document.addEventListener("keydown", this._handleEscClose);
    this.popupSelector.addEventListener("mousedown", this._handleOverlayClose);
  }
}
