const { ipcRenderer } = require("electron");

$(() => {
  ipcRenderer.invoke("getProfileCount", {}).then((result) => {
    console.log("Get Profile Count:", result);
    $("#localProfileCount").text(result.local);
    $("#cloudProfileCount").text(result.cloud);
  });
});

$("#welcomeTitle").text(`Hoşgeldin ${process.env.USERNAME} 🎉`);
