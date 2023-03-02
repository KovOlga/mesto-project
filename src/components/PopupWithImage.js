import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, captionSelector) {
    super(popupSelector);
    this.image = imageSelector;
    this.caption = captionSelector;
  }

  open(imageName, imageLink) {
    super.open();

    this.image.src = imageLink;
    this.image.alt = imageName;
    this.caption.textContent = imageName;
  }
}
