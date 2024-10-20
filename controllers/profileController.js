const fs = require("fs");
const path = require("path");

const config = path.join(__dirname, "..", "config.json");

const Profile = require("../models/profile");
const Save = require("../models/save");
const GameSii = require("../models/gameSii");

/**
 * TODO : All Local Profile - Router Method
 */
exports.localLoadProfiles = async (req, res) => {
  console.clear();
  console.log(" > Profile Load Method ");
  const resBodyData = {
    data: {
      profiles: [],
    },
    length: 0,
  };
  try {
    fs.readFile(config, "utf-8", (err, data) => {
      data = JSON.parse(data);
      fs.readdir(data.user_document_path, (err, files) => {
        if (err) {
          throw new Error("Config Path Not Found !");
        }
        files.map((file) => {
          if (file === "profiles") {
            const allProfilesPath = path.join(data.user_document_path, file);
            const allProfileFolders = fs.readdirSync(allProfilesPath);
            allProfileFolders.forEach((folder) => {
              const profilePath = path.join(allProfilesPath, folder);
              const profile = new Profile(profilePath);
              profile.saveCountLoad();
              resBodyData.data.profiles.push(profile);
            });
          }
        });
        resBodyData.length = resBodyData.data.profiles.length;
        res.json(resBodyData);
      });
    });
  } catch (error) {
    res.status(500).json({
      title: "Profile List Load - Error:",
      message: error.message,
    });
  }
};

/**
 * TODO : Select Local Profile - Router Method
 */
exports.localGetProfile = async (req, res) => {
  console.clear();
  console.log(" > Get Profile Method ");
  const resBodyData = {
    data: {
      profile: null,
    },
    length: 0,
  };
  try {
    console.log("Request Data:", req.params);
    fs.readFile(config, "utf-8", (err, data) => {
      data = JSON.parse(data);
      fs.readdir(data.user_document_path, (err, files) => {
        if (err) {
          throw new Error("Config Path Not Found !");
        }
        files.map((file) => {
          if (file === "profiles") {
            const allProfilesPath = path.join(data.user_document_path, file);
            const allProfileFolders = fs.readdirSync(allProfilesPath);
            allProfileFolders.forEach(async (folder) => {
              if (folder === req.params.displayName) {
                const profilePath = path.join(allProfilesPath, folder);
                const profile = new Profile(profilePath);
                profile.saveLoad();
                profile.saveCountLoad();
                resBodyData.data.profile = profile;
              }
            });
          }
        });
        resBodyData.length = resBodyData.data.length;
        res.json(resBodyData);
      });
    });
  } catch (error) {
    console.error("Get Profile", error);
  }
};

/**
 * TODO : Information for the selected save - Router Method
 */
exports.localGetProfileSaveItem = async (req, res) => {
  console.clear();
  console.log("> Get Profile Item Save Data Method ");
  const resBodyData = {
    data: {
      profile: null,
      save: null,
      game: null,
    },
    length: 0,
  };
  try {
    console.log("Request Data:", req.params);
    fs.readFile(config, "utf-8", (err, data) => {
      data = JSON.parse(data);
      fs.readdir(data.user_document_path, async (err, files) => {
        if (err) {
          throw new Error("Config Path Not Found !");
        }

        const profilePath = path.join(
          data.user_document_path,
          "profiles",
          req.params.displayName
        );
        const savePath = path.join(
          data.user_document_path,
          "profiles",
          req.params.displayName,
          "save",
          req.params.saveDisplayName
        );
        const gamePath = path.join(
          data.user_document_path,
          "profiles",
          req.params.displayName,
          "save",
          req.params.saveDisplayName,
          "game.sii"
        );
        if (!fs.existsSync(profilePath)) {
          throw new Error(profilePath + " Profile Path Not Found !");
        }
        if (!fs.existsSync(savePath)) {
          throw new Error(savePath + " Save Path Not Found !");
        }
        const profile = new Profile(profilePath);
        profile.saveLoad();
        profile.saveCountLoad();
        resBodyData.data.profile = profile;

        const save = new Save(savePath);

        resBodyData.data.save = save;
        if (save.gameDecrypt === true) {
          const game = new GameSii(gamePath);
          game.datalines = game.gameDataLinesLoad();
          game.lineContainers = await game.gameLineContainersLoad();
          game.gameContentLoad();
          resBodyData.data.game = game.getData();
        }

        resBodyData.length = Object.keys(resBodyData).length;
        console.log("Response Data:", resBodyData);
        res.status(200).json(resBodyData);
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
    console.error("local Get Profile Save Item - Error:", error);
  }
};
