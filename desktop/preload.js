const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("FlyKeyDesktop", {
  platform: process.platform,
  app: "FlyKey"
});
