import { popupImage } from "./data.js";
import { openPopup, closePopup } from "./modal.js";
import { userId } from "./index.js";
import { deleteCard } from "./api.js";

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

      const btnLike = photoCardElement.querySelector(
        ".photo-elements__like-button"
      );
      btnLike.addEventListener("click", (evt) => {
        evt.target.classList.toggle("photo-elements__like-button_active");
      });
      const counterLike = photoCardElement.querySelector(
        ".photo-elements__like-counter"
      );
      if (card.likes.length === 0) {
        counterLike.remove();
      } else {
        const str = card.likes.length.toString();
        counterLike.textContent = str;
        console.log(str);
      }

      const btnDeletePhotoElement = photoCardElement.querySelector(
        ".photo-elements__bin-button"
      );
      if (userId === card.owner._id) {
        btnDeletePhotoElement.addEventListener("click", () => {
          openPopup(document.querySelector(".popup_agree-delete"));
          const btnAgreeDelete = document.querySelector(".popup__btn-agree");
          btnAgreeDelete.addEventListener("click", () => {
            deleteCard(card._id)
              .then(() => {
                const dlt = btnDeletePhotoElement.closest(
                  ".photo-elements__item"
                );
                closePopup(document.querySelector(".popup_agree-delete"));
                dlt.remove();
              })
              .catch((err) => {
                console.log(`Ошибка при удалении карточки: ${err.message}`);
              });
          });
        });
      } else {
        btnDeletePhotoElement.remove();
      }

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
