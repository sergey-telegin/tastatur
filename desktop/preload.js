const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("FlyKeyDesktop", {
  isDesktop: true,
  platform: process.platform,
  app: "FlyKey"
});
