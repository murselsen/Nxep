const Save = require("./save");
const fs = require("fs");
const path = require("path");

class Profile {
  constructor(dirPath) {
    this.location = "/profiles/local/" + dirPath.split("\\").pop();
    this.path = dirPath;
    this.displayName = dirPath.split("\\").pop();
    this.profileFilePath = path.join(dirPath, "profile.sii");
    this.profileDetailDecrypt = false;

    this.profileDetailText = "";
    this.profileDetail = {
      nameless: "",
      content: {
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
      },
    };
    this.saveList = [];
    this.saveCount = 0;
    this.init();
  }

  init = () => {
    this.profileDetailIsDecrypt();
    if (this.profileDetailDecrypt) {
      this.profileDetailLoad();
    } else {
      this.profileDetail = {};
    }
  };

  profileDetailIsDecrypt = () => {
    const profileDetailStream = fs.readFileSync(this.profileFilePath, "utf8");
    let profileDetailStreamLines = profileDetailStream.split("\n");

    if (profileDetailStreamLines[0].includes("SiiNunit")) {
      this.profileDetailDecrypt = true;
    } else {
      this.profileDetailDecrypt = false;
    }
  };

  profileDetailLoad = () => {
    const profileDetailStream = fs.readFileSync(this.profileFilePath, "utf-8");
    let profileDetailStreamLines = profileDetailStream.split("\n");
    for (let line of profileDetailStreamLines) {
      if (line.includes("user_profile")) {
        this.profileDetail.nameless = line.split(" ")[2];
      }

      line = line.trim().split(": ");
      if (line.length > 1) {
        let key = line[0];
        let value = line[1];

        // User Profile Content
        switch (key) {
          case "face":
            const face = Number(value);
            this.profileDetail.content.face = face;
            break;
          case "profile_name":
            value = value.replaceAll('"', "");
            const profile_name = value;
            this.profileDetail.content.profile_name = profile_name;
            break;
          case "brand":
            const brand = value;
            this.profileDetail.content.brand = brand;
            break;
          case "company_name":
            value = value.replaceAll('"', "");
            const company_name = value;
            this.profileDetail.content.company_name = company_name;
          case "male":
            const male = Boolean(value);
            this.profileDetail.content.male = male;
            break;
          case "cached_experience":
            const cached_experience = Number(value);
            this.profileDetail.content.cached_experience = cached_experience;
            break;

          case "cached_distance":
            const cached_distance = Number(value);
            this.profileDetail.content.cached_distance = cached_distance;
            break;
          case "cached_stats":
            const cached_stats = Number(value);
            this.profileDetail.content.cached_stats = cached_stats;
            break;
          case "cached_discovery":
            const cached_discovery = Number(value);
            this.profileDetail.content.cached_discovery = cached_discovery;
            break;
          case "user_data":
            const user_data = Number(value);
            this.profileDetail.content.user_data = user_data;
          case "active_mods":
            const active_mods = Number(value);
            this.profileDetail.content.active_mods = active_mods;
            break;
          case "customization":
            const customization = Number(value);
            this.profileDetail.content.customization = customization;
            break;
          case "version":
            const version = Number(value);
            this.profileDetail.content.version = version;
            break;
          case "online_user_name":
            value = value.replaceAll('"', "");
            const online_user_name = value;
            this.profileDetail.content.online_user_name = online_user_name;
          case "online_password":
            value = value.replaceAll('"', "");
            const online_password = value;
            this.profileDetail.content.online_password = online_password;
            break;
          case "creation_time":
            const creation_time = Number(value);
            this.profileDetail.content.creation_time = creation_time;
            break;
          case "save_time":
            const save_time = Number(value);
            this.profileDetail.content.save_time = save_time;
            break;
          case "map_path":
            value = value.replaceAll('"', "");
            const map_path = value;
            this.profileDetail.content.map_path = map_path;
            break;
          case "logo":
            value = value.replaceAll('"', "");
            const logo = value;
            this.profileDetail.content.logo = logo;
            break;
          default:
            break;
        }

        // User Data
        if (key.includes("user_data[")) {
          this.profileDetail.content.user_data_list.push(value);
          // console.log("User Data Item:", value);
        }
        // Active Mods
        if (key.includes("active_mods[")) {
          this.profileDetail.content.active_mods_list.push(value);
          // console.log("Active Mods Item:", value);
        }
        // Cached Stats
        if (key.includes("cached_stats[")) {
          this.profileDetail.content.cached_stats_list.push(value);
          // console.log("Cached Stats Item:", value);
        }
        // Cached Discovery
        if (key.includes("cached_discovery[")) {
          this.profileDetail.content.cached_discovery_list.push(value);
          // console.log("Cached Discovery Item:", value);
        }
      }
    }
  };

  // Save Controls
  saveLoad = () => {
    try {
      const profileSaveDirs = fs.readdirSync(path.join(this.path, "save"));
      for (const profileSaveDir of profileSaveDirs) {
        const profileSaveDataPath = path.join(
          this.path,
          "save",
          profileSaveDir
        );
        this.saveList.push(new Save(profileSaveDataPath));
      }
    } catch (error) {
      console.error("Profile | Save Load Method - Error:", error);
    }
  };
  saveCountLoad = () => {
    this.saveCount = fs.readdirSync(path.join(this.path, "save")).length;
  };
}

module.exports = Profile;
