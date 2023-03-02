import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup, popupImagePicture, popupImageCaption) {
    super(popup);
    this.image = popupImagePicture;
    this.caption = popupImageCaption;
  }

  open(imageName, imageLink) {
    super.open();

    this.image.src = imageLink;
    this.image.alt = imageName;
    this.caption.textContent = imageName;
  }
}
