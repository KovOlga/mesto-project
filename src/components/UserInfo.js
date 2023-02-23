export default class UserInfo {
  constructor(api, nameSelector, jobSelector, avatarSelector) {
    this.api = api;
    this.name = nameSelector;
    this.job = jobSelector;
    this.avatar = avatarSelector;
    // this.getUserInfo = getUserInfo;
    // this.setUserInfo = setUserInfo;
  }

  getUserInfo() {
    return this.api.getUserData();
  }

  _updateAvatar(newUserData) {
    this.avatar = newUserData.avatar;
  }

  _updateUserInfo(newUserData) {
    this.name.textContent = newUserData.name;
    this.job.textContent = newUserData.about;
  }

  setUserInfo(name, job) {
    this.api.patchProfile(name, job).then((newUserData) => {
      this._updateUserInfo(newUserData);
    });
  }
}
