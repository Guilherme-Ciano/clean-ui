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
  //get the path of the netlify build
  mainWindow.loadURL("http://localhost:3000/");
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
