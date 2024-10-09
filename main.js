const { app, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const process = require("process");


app.whenReady().then(() => {
  const { mainWin, pathSaveWin } = require("./browsers");

  fs.readFile(path.join(__dirname, "config.json"), "utf-8", (err, data) => {
    data = JSON.parse(data);
    if (err) {
      console.log(`${path.join(__dirname, "config.json")} read file : `, err);
      return false;
    }

    if (data.user_document_path === "" || data.user_document_path === " ") {
      new pathSaveWin();
    } else {
      new mainWin();
    }

    require("./controllers");
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
