const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");

class pathSaveWin {
  constructor() {
    this.options = {
      height: 500,
      width: 600,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, "..", "preload.js"),
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
      icon: path.join(__dirname, "logo.svg"),
      title: "My App",
      openDevTools: true,
    };

    this.win = new BrowserWindow(this.options);
    this.win.loadFile(path.join(__dirname, "..", "views", "pathSaveWin.html"));

    return this.win;
  }

  close() {
    this.win.close();
  }
  quit() {
    this.win.destroy();
  }
}

module.exports = pathSaveWin;
