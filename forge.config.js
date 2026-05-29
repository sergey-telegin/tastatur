const path = require("node:path");

const isMasBuild = process.env.FLYKEY_BUILD_TARGET === "mas";
const entitlements = path.join(__dirname, "build", "entitlements.mas.plist");
const entitlementsInherit = path.join(__dirname, "build", "entitlements.mas.inherit.plist");

module.exports = {
  packagerConfig: {
    name: "FlyKey",
    executableName: "FlyKey",
    appBundleId: "org.flykey.app",
    appCategoryType: "public.app-category.education",
    asar: true,
    osxSign: isMasBuild
      ? {
          entitlements,
          entitlementsInherit,
          provisioningProfile: process.env.FLYKEY_PROVISIONING_PROFILE || undefined,
          identity: process.env.FLYKEY_MAC_APP_STORE_IDENTITY || undefined
        }
      : {}
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"]
    },
    {
      name: "@electron-forge/maker-dmg",
      platforms: ["darwin"],
      config: {
        name: "FlyKey",
        format: "ULFO"
      }
    },
    {
      name: "@electron-forge/maker-pkg",
      platforms: ["mas"],
      config: {
        name: "FlyKey",
        identity: process.env.FLYKEY_MAC_INSTALLER_IDENTITY || undefined
      }
    }
  ]
};
