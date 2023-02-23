export default class UserInfo {
  constructor({
    nameSelector,
    jobSelector,
    avatarSelector,
    getUserData,
    setUserData,
  }) {
    this.name = nameSelector;
    this.job = jobSelector;
    this.avatar = avatarSelector;
    this.getUserData = getUserData;
    this.setUserData = setUserData;
  }

  getUserInfo() {
    return this.getUserData();
  }

  _updateAvatar(newUserData) {
    this.avatar = newUserData.avatar;
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
}
