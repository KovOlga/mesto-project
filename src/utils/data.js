const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const formProfile = document.forms.profile;
const formPlace = document.forms.card;

const nameInput = formProfile.name;
const aboutInput = formProfile.about;

const popupProfile = document.querySelector(".popup_profile");

const popupImage = document.querySelector(".popup_image-window");

const popupAgreeDelete = document.querySelector(".popup_agree-delete");

export {
  profileName,
  profileAbout,
  formProfile,
  formPlace,
  nameInput,
  aboutInput,
  popupProfile,
  popupImage,
  popupAgreeDelete,
};
