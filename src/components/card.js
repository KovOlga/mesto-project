import { popupImage } from "./data.js";
import { openPopup, closePopup } from "./modal.js";
import { userId } from "./index.js";
import { deleteCard, addLike, removeLike } from "./api.js";

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

      const counterLike = photoCardElement.querySelector(
        ".photo-elements__like-counter"
      );
      const btnLike = photoCardElement.querySelector(
        ".photo-elements__like-button"
      );

      //отрисовали при первоначальном рендеринге, где уже есть лайк юзера
      function hasUserLike(likesArr) {
        likesArr.forEach((likeElement) => {
          if (likeElement._id === userId) {
            console.log(likeElement);
            btnLike.classList.add("photo-elements__like-button_active");
          }
        });
      }
      hasUserLike(card.likes);

      //при первоначальном рендеринге отрисовываем количество лайков
      if (card.likes.length === 0) {
        counterLike.classList.add("photo-elements__like-container_disabled");
      } else {
        const str = card.likes.length.toString();
        counterLike.textContent = str;
      }

      //слушатель добавления/удаления лайка
      btnLike.addEventListener("click", (evt) => {
        if (btnLike.classList.contains("photo-elements__like-button_active")) {
          removeLike(card._id)
            .then((newLikesArr) => {
              console.log("remove like");
              console.log(newLikesArr.likes);

              evt.target.classList.toggle("photo-elements__like-button_active");
              if (newLikesArr.likes.length === 0) {
                counterLike.classList.add(
                  "photo-elements__like-container_disabled"
                );
              } else {
                counterLike.classList.remove(
                  "photo-elements__like-container_disabled"
                );
                const likeNumber = newLikesArr.likes.length.toString();
                counterLike.textContent = likeNumber;
              }
            })
            .catch((err) => {
              console.log(
                `Ошибка при отправке данных о лайке на сервер: ${err.message}`
              );
            });
        } else {
          addLike(card._id)
            .then((newLikesArr) => {
              console.log("add like");
              console.log(newLikesArr.likes);

              evt.target.classList.toggle("photo-elements__like-button_active");
              counterLike.classList.remove(
                "photo-elements__like-container_disabled"
              );
              const likeNumber = newLikesArr.likes.length.toString();
              counterLike.textContent = likeNumber;
            })
            .catch((err) => {
              console.log(
                `Ошибка при отправке данных о лайке на сервер: ${err.message}`
              );
            });
        }
      });

      const btnDeletePhotoElement = photoCardElement.querySelector(
        ".photo-elements__bin-button"
      );

      //отрисовываем иконку корзины и вешаем слушатель попапа и удаления, если айди юзера совпадает
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
