const fs = require("fs");
const path = require("path");

const config = path.join(__dirname, "..", "config.json");
const localProfileList = [];
const cloudProfileList = [];
const Profile = require("../models/profile");
exports.loadProfiles = async (req, res) => {
  console.clear();
  console.log(" > Profile Load Method ");
  try {
    let resData = {
      Profiles: {
        localProfileList: localProfileList,
        cloudProfileList: cloudProfileList,
      },
    };

    fs.readFile(config, "utf-8", (err, data) => {
      data = JSON.parse(data);
      fs.readdir(data.user_document_path, (err, files) => {
        if (err) {
          throw new Error("Config Path Not Found !");
        }
        files.map((file) => {
          switch (file) {
            // Local Profile Folder
            case "profiles":
              const localProfilesPath = path.join(
                data.user_document_path,
                file
              );
              let existsLocalProfile = fs.existsSync(localProfilesPath);
              if (existsLocalProfile) {
                console.log("Profile Folder Exists ?", existsLocalProfile);
                fs.readdir(localProfilesPath, (err, files) => {
                  files.map((file) => {
                    let profilePath = path.join(localProfilesPath, file);
                    fs.readdir(profilePath, (err, profileContentfiles) => {
                      // console.log(file, ":", profileContentfiles);

                      profileContentfiles.map((contentFile) => {
                        switch (contentFile) {
                          case "profile.sii":
                            // Create a profile object
                            const profile = new Profile(profilePath);
                            console.log(
                              "\n----------------------------------------------------\nProfile Item:",
                              profile
                            );

                            localProfileList.push(profile);
                          default:
                            break;
                        }
                      });
                    });
                  });
                });
              } else {
                throw new Error("Game Local Profile Folder Not Found !");
              }
              break;

            // Cloud Profile Folder
            case "steam_profiles":
              let existsCloudProfile = fs.existsSync(
                path.join(data.user_document_path, file)
              );
              if (existsCloudProfile) {
                console.log(
                  "Steam Profile Folder Exists ?",
                  existsCloudProfile
                );
              } else {
                throw new Error("Game Cloud Profile Folder Not Found !");
              }
              break;

            default:
              break;
          }
        });
      });
    });

    res.json(resData);
  } catch (error) {
    res.status(500).json({
      title: "Profile List Load",
      message: error,
    });
  }
};

exports.loadProfileDetail = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      title: "Profile Detail Load",
      message: error.message,
    });
  }
};
