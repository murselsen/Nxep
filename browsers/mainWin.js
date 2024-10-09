const { BrowserWindow } = require("electron");
const path = require("path");

class mainWin {
  constructor() {
    this.win = new BrowserWindow({
      height: 800,
      width: 1640,
      minWidth: 1224,
      minHeight: 768,
      webPreferences: {
        preload: path.join(__dirname, "..", "preload.js"),
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
      icon: path.join(__dirname, "logo.svg"),
      title: "My App",
      openDevTools: true,
    });
    this.win.loadFile(path.join(__dirname, "..", "views", "mainWin.html"));
    return this.win;
  }
}

module.exports = mainWin;
