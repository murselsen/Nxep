const { ipcRenderer } = require("electron");
const quitButton = $("#windowQuitBtn");
const configForm = $("#configForm");
quitButton.on("click", (e) => {
  ipcRenderer.send("pathSaveWin-quit", true);
});
configForm.on("submit", (e) => {
  e.preventDefault();
  console.log("Config Form:", configForm.serializeArray());
  ipcRenderer.send("pathSaveWin-saveConfig", {
    user_document_path: configForm.serializeArray()[0].value,
  });
});
