function openPopup(openElement) {
  openElement.classList.add("popup_opened");
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

function closePopup(closElement) {
  closElement.classList.remove("popup_opened");
}

function closePopupOnOverlayClick(evt, closElement) {
  if (evt.target === evt.currentTarget) {
    closePopup(closElement);
  }
}

function closePopupOnEsc(evt, closElement) {
  if (evt.key === "Escape") {
    closePopup(closElement);
  }
}

function validateEscOnPopup(evt) {
  popupArr.forEach((element) => {
    if (element.classList.contains("popup_opened")) {
      closePopupOnEsc(evt, element);
    }
    console.log("uyf");
  });
}
