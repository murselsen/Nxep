const fs = require("fs");
const path = require("path");

const config = path.join(__dirname, "..", "config.json");

const Profile = require("../models/profile");

/**
 * TODO : All Local Profile - Router Method
 */
exports.localLoadProfiles = async (req, res) => {
  console.log(" > Profile Load Method ");
  const resBodyData = { data: [], length: 0 };
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
              resBodyData.data.push(profile);
            });
          }
        });
        resBodyData.length = resBodyData.data.length;
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
  const resBodyData = { data: [], length: 0 };
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
                resBodyData.data.push(profile);
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
  console.log(" > Get Profile Item Save Data Method ");
  const resBodyData = { data: [], length: 0 };
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
            allProfileFolders.forEach((folder) => {
              if (folder === req.params.displayName) {
                const profilePath = path.join(allProfilesPath, folder);
                const profile = new Profile(profilePath);
                profile.saveLoad();
                profile.saveCountLoad();
                profile.saveList.forEach((save) => {
                  if (save.displayName === req.params.saveDisplayName) {
                    console.log("Router Console Save", save);
                    if (save.gameDecrypt == true) {
                      save.gameLoad();
                    }
                    console.log("Save: ", save, save.displayName);
                    resBodyData.data.push(save);
                  }
                });
              }
            });
          }
        });
        resBodyData.length = resBodyData.data.length;
        res.json(resBodyData);
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
    console.error("local Get Profile Save Item - Error:", error);
  }
};
