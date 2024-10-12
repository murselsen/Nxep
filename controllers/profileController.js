const fs = require("fs");
const path = require("path");

const config = path.join(__dirname, "..", "config.json");
const localProfileList = [];
const cloudProfileList = [];

exports.loadProfiles = async (req, res) => {
  console.clear();
  try {
    let resData = {
      Profiles: [
        {
          title: "Local Profile List",
          data: localProfileList,
        },
        {
          title: "Cloud Profile List",
          data: cloudProfileList,
        },
      ],
    };

    res.json(data);

    console.log(data);
    console.log("Config Path:", config);
    fs.readFile(config, "utf-8", (err, data) => {
      data = JSON.parse(data);
      fs.readdir(data.user_document_path, (err, files) => {
        if (err) {
          throw new Error("Config Path Not Found !");
        }
        // console.log("Config Game Dirs:", files)
        files.map((file) => {
          // Local Profile Folder
          switch (file) {
            case "profiles":
              let exists = fs.existsSync(
                path.join(data.user_document_path, file)
              );
              if (exists) {
                console.log("Profile Folder Exists ?", exists);
                resData.status = {
                  title: "Profile List Load",
                  message: "Game Local Profile Folder Found !",
                };
                res.status(200).json();
              } else {
                res.status(500).json({
                  title: "Profile List Load",
                  message: "Game Local Profile Folder Not Found !",
                });
              }
              break;

            default:
              break;
          }
          fs.existsSync();
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      title: "Profile List Load",
      message: error.message,
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
