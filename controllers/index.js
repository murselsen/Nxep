const electron = require("electron");
const { ipcMain } = electron;
const process = require("process");
const ProfileManager = require("./profileManager");

// console.log(process.env);
console.log("Controller Process Logger");

ipcMain.on("pathSaveWin-quit", (event, args) => {
  console.log("pathSaveWin-quit", args);
  app.quit();
});
ipcMain.on("pathSaveWin-saveConfig", (event, args) => {
  const configPath = path.join(__dirname, "config.json");
  fs.readFile(configPath, "utf-8", async (err, data) => {
    const datetime = new Date();
    data = JSON.parse(data);
    data.user = process.env.USERNAME;
    data.user_document_path = args.user_document_path;
    data.date = `${datetime.getDate()}/${datetime.getMonth()}/${datetime.getFullYear()}`;
    data.time = `${datetime.getHours()}:${datetime.getMinutes()}`;

    fs.writeFileSync(configPath, JSON.stringify(data));
    app.relaunch();
    app.exit();
  });
});

const profileManager = new ProfileManager();

// Get Profiles Count
ipcMain.handle("getProfileCount", async (event, args) => {
  return {
    local: profileManager.getLocalProfileCount(),
    cloud: profileManager.getCloudProfileCount(),
  };
});

// Get Profile List
ipcMain.handle("getProfileList", async (event, args) => {
  data = profileManager.getLocalProfileList();
  return data;
});
// Get Local Profile Data
ipcMain.handle("getProfileData", async (event, args) => {
  const trucks = require("../models/trucks_name_data.json");
  const profileData = await profileManager.getLocalProfileData(
    args.displayNameValue.toString()
  );
  // console.log("Get Profile Data:", profileData);
  return {
    trucks: trucks,
    profile: profileData,
  };
});

//getSaveProfileData
ipcMain.handle("getSaveProfileData", async (event, args) => {
  const trucks = require("../models/trucks_name_data.json");

  const profileSaveData = await profileManager.getLocalSaveData(
    args.profileDisplayName.toString(),
    args.saveDisplayName.toString()
  );
  return {
    trucks: trucks,
    profile: profileSaveData.profile,
    save: profileSaveData.save,
  };
});
