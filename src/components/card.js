import { popupImage } from "./data.js";
import { openPopup } from "./utils.js";

const popupImagePicture = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const photoElementsGallery = document.querySelector(".photo-elements__list");
const photoCardTemplateContent = document.querySelector(
  "#photo-cards-template"
).content;

const renderCard = function () {
  return {
    createCard: function (card) {
      const photoCardElement = photoCardTemplateContent.cloneNode(true);
      const photoElementTitle = photoCardElement.querySelector(
        ".photo-elements__title"
      );
      photoElementTitle.textContent = card.name;
      const photoElementImage = photoCardElement.querySelector(
        ".photo-elements__image"
      );
      photoElementImage.src = card.link;
      photoElementImage.alt = card.name;
      photoCardElement
        .querySelector(".photo-elements__like-button")
        .addEventListener("click", (evt) => {
          evt.target.classList.toggle("photo-elements__like-button_active");
        });
      const photoElementDeleteBtn = photoCardElement.querySelector(
        ".photo-elements__bin-button"
      );
      photoElementDeleteBtn.addEventListener("click", () => {
        const dlt = photoElementDeleteBtn.closest(".photo-elements__item");
        dlt.remove();
      });

      photoElementImage.addEventListener("click", () => {
        popupImagePicture.src = photoElementImage.src;
        popupImagePicture.alt = photoElementImage.alt;
        popupImageCaption.textContent = photoElementTitle.textContent;

        openPopup(popupImage);
      });

      return photoCardElement;
    },

    addCard: function (card) {
      photoElementsGallery.prepend(this.createCard(card));
    },
  };
};

export { renderCard };
