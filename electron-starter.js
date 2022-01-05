const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 230,
    transparent: true,
    frame: false,
  });

  //set the icon of the taskbar
  mainWindow.setTitle("Clean UI");
  mainWindow.setIcon(path.join(__dirname, "assets/icon.png"));
  //get the path of the netlify build
  mainWindow.loadURL("https://clean-ui.netlify.app/");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
