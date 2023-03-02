import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popup, popupImagePictureSelector, popupImageCaptionSelector }) {
    super(popup);
    this.image = document.querySelector(popupImagePictureSelector);
    this.caption = document.querySelector(popupImageCaptionSelector);
  }

  open(imageName, imageLink) {
    super.open();

    this.image.src = imageLink;
    this.image.alt = imageName;
    this.caption.textContent = imageName;
  }
}
