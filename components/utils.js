function openPopup(openElement) {
  if (openElement.classList.contains("popup_profile")) {
    this.resetErrorOnOpen(formProfile);
  }
  if (openElement.classList.contains("popup_new-place")) {
    formPlace.reset();
    this.resetErrorOnOpen(formPlace);
  }
  openElement.classList.add("popup_opened");
}

export { openPopup };
