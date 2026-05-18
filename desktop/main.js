const { app, BrowserWindow, shell } = require("electron");
const path = require("node:path");

const isMac = process.platform === "darwin";

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 980,
    minHeight: 680,
    title: "FlyKey",
    backgroundColor: "#000000",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  window.once("ready-to-show", () => {
    window.show();
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      shell.openExternal(url);
      return { action: "deny" };
    }

    return { action: "allow" };
  });

  window.webContents.on("will-navigate", event => {
    const targetUrl = event.url;
    if (targetUrl.startsWith("http://") || targetUrl.startsWith("https://")) {
      event.preventDefault();
      shell.openExternal(targetUrl);
    }
  });

  return window.loadFile(path.join(__dirname, "..", "index.html"));
}

app.setName("FlyKey");

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
