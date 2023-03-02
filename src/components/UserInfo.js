export default class UserInfo {
  constructor({
    profileName,
    profileJob,
    avatar,
    getUserData,
    setUserData,
    setNewAvatar,
  }) {
    this.name = profileName;
    this.job = profileJob;
    this.avatar = avatar;
    this.getUserData = getUserData;
    this.setUserData = setUserData;
    this.setNewAvatar = setNewAvatar;
  }

  getUserInfo() {
    return this.getUserData();
  }

  _updateAvatar(newUserData) {
    this.avatar.src = newUserData.avatar;
  }

  _updateUserInfo(newUserData) {
    this.name.textContent = newUserData.name;
    this.job.textContent = newUserData.about;
  }

  setUserInfo(name, job) {
    return this.setUserData(name, job).then((newUserData) => {
      this._updateUserInfo(newUserData);
    });
  }

  setAvatar(url) {
    return this.setNewAvatar(url).then((newUserData) => {
      this._updateAvatar(newUserData);
    });
  }
}
