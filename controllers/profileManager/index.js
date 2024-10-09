const fs = require("fs");
const path = require("path");
const Profile = require("../../models/profile");
const Save = require("../../models/save");

const config = require("../../config.json");
class ProfileManager {
  constructor() {
    this.localProfileList = [];
    this.cloudProfileList = [];
    this.init();
  }
  init() {
    try {
      const files = fs.readdirSync(config.user_document_path);
      for (const file of files) {
        if (file === "profiles") {
          const localProfileDirs = fs.readdirSync(
            path.join(config.user_document_path, file)
          );
          for (const localProfileDirName of localProfileDirs) {
            let localProfilePath = path.join(
              config.user_document_path,
              file,
              localProfileDirName
            );
            this.localProfileList.push(new Profile(localProfilePath));
          }
        }
        if (file === "steam_profiles") {
          const profileDirs = fs.readdirSync(
            path.join(config.user_document_path, file)
          );
          for (const profileDirName of profileDirs) {
            let profilePath = path.join(
              config.user_document_path,
              file,
              profileDirName
            );
            this.cloudProfileList.push(new Profile(profilePath));
          }
        }
      }
    } catch (error) {
      console.error("Profile Manager - Init", error);
    }
  }

  // Local Profile Methods
  getLocalProfileCount() {
    return this.localProfileList.length;
  }
  getLocalProfileList() {
    return this.localProfileList;
  }
  getLocalProfileData(displayName) {
    let returnProfile;
    this.localProfileList.forEach((profile) => {
      if (profile.displayName == displayName) {
        returnProfile = profile;
      }
    });
    return returnProfile;
  }
  getLocalSaveData(profileDisplayName, saveDisplayName) {
    let returnProfile, returnSave;
    this.localProfileList.forEach((profile) => {
      if (profile.displayName == profileDisplayName) {
        profile.saves.forEach((save) => {
          if (save.displayName == saveDisplayName) {
            save.gameDetailLoad()
            returnProfile = profile;
            returnSave = save;
          }
        });
      }
    });
    return { profile: returnProfile, save: returnSave };
  }

  // Cloud Profile Methods
  getCloudProfileCount() {
    return this.cloudProfileList.length;
  }
  getCloudProfileList() {
    return this.cloudProfileList;
  }
}

module.exports = ProfileManager;
