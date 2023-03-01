import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupElement) {
    super(popupElement);
    this._image = popupElement.querySelector(".popup__image");
    this._caption = popupElement.querySelector(".popup__caption");
  }
  
  open(link, name) {
    super.open();
      this._image.src = link;
      this._image.alt = name;
      this._caption.textContent = name;
  }
}