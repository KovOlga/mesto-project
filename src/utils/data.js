const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const formProfile = document.forms.profile;
const formPlace = document.forms.card;

const nameInput = formProfile.name;
const jobInput = formProfile.job;

const popupProfile = document.querySelector(".popup_profile");

const popupImage = document.querySelector(".popup_image-window");

const popupAgreeDelete = document.querySelector(".popup_agree-delete");

export {
  profileName,
  profileJob,
  formProfile,
  formPlace,
  nameInput,
  jobInput,
  popupProfile,
  popupImage,
  popupAgreeDelete,
};
