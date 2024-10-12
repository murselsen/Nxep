const Save = require("./save");
const fs = require("fs");
const path = require("path");

class Profile {
  constructor(dirPath) {
    this.path = dirPath;
    this.displayName = dirPath.split("\\").pop();
    this.profileFilePath = path.join(dirPath, "profile.sii");
    this.saves = [];
    this.profileDetail = {
      user_profile_nameless: "",
      face: "",
      brand: "",
      map_path: "",
      logo: "",
      company_name: "",
      male: true,
      cached_experience: "",
      cached_distance: "",
      user_data: "",
      user_data_list: [],
      active_mods: "",
      active_mods_list: [],
      customization: "",
      cached_stats: "",
      cached_stats_list: [],
      cached_discovery: "",
      cached_discovery_list: [],
      version: "",
      online_user_name: "",
      online_password: "",
      profile_name: "",
      creation_time: "",
      save_time: "",
    };
    this.init();
    return this;
  }
  init() {
    try {
      this.saveLoad();
      this.profileDetailLoad();
      // console.log("Profile Detail: ", this.profileDetail);
    } catch (error) {
      console.error(error);
    }
  }
  saveLoad() {
    const profileSaveDirs = fs.readdirSync(path.join(this.path, "save"));
    for (const profileSaveDir of profileSaveDirs) {
      const profileSaveData = fs.readdirSync(
        path.join(this.path, "save", profileSaveDir)
      );
      this.saves.push(new Save(path.join(this.path, "save", profileSaveDir)));
    }
  }
  profileDetailLoad() {
    const profileDetailStream = fs.readFileSync(this.profileFilePath, "utf-8");
    let profileDetailStreamLines = profileDetailStream.split("\n");
    // console.log("Profile Detail Stream :", profileDetailStreamLines);
    for (let line of profileDetailStreamLines) {
      if (line.includes("user_profile")) {
        this.profileDetail.user_profile_nameless = line.split(" ")[2];
        // console.log("- Line:", line.split(" "));
      }

      line = line.trim().split(": ");
      if (line.length > 1) {
        let key = line[0];
        let value = line[1];

        // User Profile Content
        switch (key) {
          case "face":
            const face = Number(value);
            this.profileDetail.face = face;
            break;
          case "profile_name":
            value = value.replaceAll('"', "");
            const profile_name = value;
            this.profileDetail.profile_name = profile_name;
            break;
          case "brand":
            const brand = value;
            this.profileDetail.brand = brand;
            break;
          case "company_name":
            value = value.replaceAll('"', "");
            const company_name = value;
            this.profileDetail.company_name = company_name;
          case "male":
            const male = Boolean(value);
            this.profileDetail.male = male;
            break;
          case "cached_experience":
            const cached_experience = Number(value);
            this.profileDetail.cached_experience = cached_experience;
            break;

          case "cached_distance":
            const cached_distance = Number(value);
            this.profileDetail.cached_distance = cached_distance;
            break;
          case "cached_stats":
            const cached_stats = Number(value);
            this.profileDetail.cached_stats = cached_stats;
            break;
          case "cached_discovery":
            const cached_discovery = Number(value);
            this.profileDetail.cached_discovery = cached_discovery;
            break;
          case "user_data":
            const user_data = Number(value);
            this.profileDetail.user_data = user_data;
          case "active_mods":
            const active_mods = Number(value);
            this.profileDetail.active_mods = active_mods;
            break;
          case "customization":
            const customization = Number(value);
            this.profileDetail.customization = customization;
            break;
          case "version":
            const version = Number(value);
            this.profileDetail.version = version;
            break;
          case "online_user_name":
            value = value.replaceAll('"', "");
            const online_user_name = value;
            this.profileDetail.online_user_name = online_user_name;
          case "online_password":
            value = value.replaceAll('"', "");
            const online_password = value;
            this.profileDetail.online_password = online_password;
            break;
          case "creation_time":
            const creation_time = Number(value);
            this.profileDetail.creation_time = creation_time;
            break;
          case "save_time":
            const save_time = Number(value);
            this.profileDetail.save_time = save_time;
            break;
          case "map_path":
            value = value.replaceAll('"', "");
            const map_path = value;
            this.profileDetail.map_path = map_path;
            break;
          case "logo":
            value = value.replaceAll('"', "");
            const logo = value;
            this.profileDetail.logo = logo;
            break;
          default:
            break;
        }
        // User Data
        if (key.includes("user_data[")) {
          this.profileDetail.user_data_list.push(value);
          // console.log("User Data Item:", value);
        }
        // Active Mods
        if (key.includes("active_mods[")) {
          this.profileDetail.active_mods_list.push(value);
          // console.log("Active Mods Item:", value);
        }
        // Cached Stats
        if (key.includes("cached_stats[")) {
          this.profileDetail.cached_stats_list.push(value);
          // console.log("Cached Stats Item:", value);
        }
        // Cached Discovery
        if (key.includes("cached_discovery[")) {
          this.profileDetail.cached_discovery_list.push(value);
          // console.log("Cached Discovery Item:", value);
        }
      }
    }
  }
  getProfileSavesList() {
    return this.saves;
  }
}

module.exports = Profile;
