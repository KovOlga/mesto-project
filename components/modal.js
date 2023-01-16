const popupFunctionality = {
  hideInputErrorOnReopen: function (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error-message_active");
    errorElement.textContent = "";
  },

  resetErrorOnOpen: function (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(".form__input"));

    inputList.forEach((inputElement) => {
      this.hideInputErrorOnReopen(formElement, inputElement);
    });
  },

  openPopup: function (openElement) {
    if (openElement.classList.contains("popup_profile")) {
      this.resetErrorOnOpen(formProfile);
    }
    if (openElement.classList.contains("popup_new-place")) {
      formPlace.reset();
      this.resetErrorOnOpen(formPlace);
    }
    openElement.classList.add("popup_opened");
  },

  openProfilePopup: function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    this.openPopup(popupProfile);
  },

  closePopup: function (closElement) {
    closElement.classList.remove("popup_opened");
  },

  closePopupOnOverlayClick: function (evt, closElement) {
    if (evt.target === evt.currentTarget) {
      this.closePopup(closElement);
    }
  },

  closePopupOnEsc: function (evt, closElement) {
    if (evt.key === "Escape") {
      this.closePopup(closElement);
    }
  },

  validateEscOnPopup: function (evt) {
    popupArr.forEach((element) => {
      if (element.classList.contains("popup_opened")) {
        this.closePopupOnEsc(evt, element);
      }
      console.log("uyf");
    });
  },
};
