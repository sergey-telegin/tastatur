const path = require("node:path");
const { execFileSync } = require("node:child_process");

const isMasBuild = process.env.FLYKEY_BUILD_TARGET === "mas";
const entitlements = path.join(__dirname, "build", "entitlements.mas.plist");
const entitlementsInherit = path.join(__dirname, "build", "entitlements.mas.inherit.plist");
const inheritedUsageDescriptionKeys = [
  "NSBluetoothAlwaysUsageDescription",
  "NSBluetoothPeripheralUsageDescription",
  "NSCameraUsageDescription",
  "NSMicrophoneUsageDescription"
];

function sanitizeMacInfoPlist(appPath) {
  const infoPlist = path.join(appPath, "Contents", "Info.plist");

  for (const key of inheritedUsageDescriptionKeys) {
    try {
      execFileSync("plutil", ["-remove", key, infoPlist]);
    } catch (error) {
      if (error.status !== 1) throw error;
    }
  }
}

module.exports = {
  packagerConfig: {
    name: "FlyKey",
    executableName: "FlyKey",
    appBundleId: "org.flykey.app",
    appCategoryType: "public.app-category.education",
    icon: path.join(__dirname, "build", "icon"),
    asar: true,
    extendInfo: {
      CFBundleShortVersionString: "1.0",
      CFBundleVersion: "1",
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: false
      }
    },
    osxSign: isMasBuild
      ? {
          entitlements,
          entitlementsInherit,
          provisioningProfile: process.env.FLYKEY_PROVISIONING_PROFILE || undefined,
          identity: process.env.FLYKEY_MAC_APP_STORE_IDENTITY || undefined
        }
      : {}
  },
  hooks: {
    postPackage: async (_config, packageResult) => {
      if (packageResult.platform !== "darwin" && packageResult.platform !== "mas") return;

      for (const outputPath of packageResult.outputPaths) {
        sanitizeMacInfoPlist(path.join(outputPath, "FlyKey.app"));
      }
    }
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
