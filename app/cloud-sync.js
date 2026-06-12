const flyKeyCloudAuthKey = "flykey-cloud-auth-v1";

function readFlyKeyCloudAuth() {
  try {
    const parsed = JSON.parse(localStorage.getItem(flyKeyCloudAuthKey)) || {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeFlyKeyCloudAuth(auth) {
  localStorage.setItem(flyKeyCloudAuthKey, JSON.stringify(auth || {}));
}

function clearFlyKeyCloudAuth() {
  localStorage.removeItem(flyKeyCloudAuthKey);
}

function currentFlyKeyCloudAccessToken() {
  return readFlyKeyCloudAuth().accessToken || null;
}

function currentFlyKeyCloudRefreshToken() {
  return readFlyKeyCloudAuth().refreshToken || null;
}

function rememberFlyKeyCloudTokens(responseData) {
  if (!responseData?.accessToken || !responseData?.refreshToken) {
    throw new Error("FlyKey cloud auth response is incomplete.");
  }

  const nextAuth = {
    ...readFlyKeyCloudAuth(),
    accessToken: responseData.accessToken,
    refreshToken: responseData.refreshToken,
    tokenType: responseData.tokenType || "Bearer",
    expiresIn: responseData.expiresIn || null,
    updatedAt: new Date().toISOString()
  };
  writeFlyKeyCloudAuth(nextAuth);
  return nextAuth;
}

function rememberFlyKeyCloudProfile(profile) {
  if (!profile?.id) return readFlyKeyCloudAuth();
  const nextAuth = {
    ...readFlyKeyCloudAuth(),
    profileId: profile.id,
    profileName: profile.name || null,
    profileRevision: profile.revision || null,
    updatedAt: new Date().toISOString()
  };
  writeFlyKeyCloudAuth(nextAuth);
  return nextAuth;
}

function currentFlyKeyContentVersion() {
  return window.FLYKEY_CONTENT_VERSION?.version || window.FLYKEY_CONTENT_BUNDLE?.meta?.version || null;
}

function buildFlyKeyLocalStateSnapshot() {
  return {
    currentLanguage,
    currentPracticeModule,
    activeFingerId,
    onboardingCompleted,
    shownOnboardingEventIds: Array.from(shownOnboardingEventIds || []),
    theme: currentTheme,
    practiceTextSize,
    keySoundEnabled,
    keyHighlightEnabled,
    fingerZonesEnabled,
    fingerHighlightEnabled,
    pressHighlightEnabled,
    showFingersEnabled,
    alternateLinesEnabled,
    metronomeBpm,
    practiceProgress: saved.practiceProgress || {}
  };
}

function buildFlyKeySettingsSnapshot() {
  return {
    theme: currentTheme,
    practiceTextSize,
    keySoundEnabled,
    keyHighlightEnabled,
    fingerZonesEnabled,
    fingerHighlightEnabled,
    pressHighlightEnabled,
    showFingersEnabled,
    alternateLinesEnabled,
    metronomeBpm
  };
}

function applyFlyKeyProfileState(profileState = {}) {
  if (!profileState || typeof profileState !== "object") return;

  Object.assign(saved, profileState);
  persist();
  initializeAppState(saved);
}

async function requireFlyKeyCloudAccessToken() {
  const auth = readFlyKeyCloudAuth();
  if (auth.accessToken) return auth.accessToken;

  if (!auth.refreshToken) {
    throw new Error("FlyKey cloud auth is required.");
  }

  const refreshed = await window.FlyKeyApiClient.refresh(auth.refreshToken);
  if (refreshed.status !== "ok") {
    clearFlyKeyCloudAuth();
    throw new Error("FlyKey cloud session expired.");
  }

  return rememberFlyKeyCloudTokens(refreshed.data).accessToken;
}

async function flyKeyCloudRegister(payload) {
  const result = await window.FlyKeyApiClient.register(payload);
  if (result.status === "ok") {
    const auth = rememberFlyKeyCloudTokens(result.data);
    writeFlyKeyCloudAuth({ ...auth, email: payload.email || null });
  }
  return result;
}

async function flyKeyCloudLogin(payload) {
  const result = await window.FlyKeyApiClient.login(payload);
  if (result.status === "ok") {
    const auth = rememberFlyKeyCloudTokens(result.data);
    writeFlyKeyCloudAuth({ ...auth, email: payload.email || null });
  }
  return result;
}

async function flyKeyCloudLogout() {
  const accessToken = currentFlyKeyCloudAccessToken();
  const result = accessToken
    ? await window.FlyKeyApiClient.logout(accessToken)
    : { status: "skipped", reason: "not-authenticated" };
  clearFlyKeyCloudAuth();
  return result;
}

async function flyKeyCloudDeleteAccount() {
  const accessToken = await requireFlyKeyCloudAccessToken();
  const result = await window.FlyKeyApiClient.deleteMe(accessToken);
  if (result.status === "ok") {
    clearFlyKeyCloudAuth();
  }
  return result;
}

async function flyKeyCloudProviders() {
  return window.FlyKeyApiClient.oauthProviders();
}

async function flyKeyCloudStartOAuth(provider) {
  const popup = window.open("", "flykey-oauth", "width=520,height=720,menubar=no,toolbar=no");
  const result = await window.FlyKeyApiClient.oauthStart(provider);
  if (result.status !== "ok") {
    popup?.close();
    return result;
  }

  if (popup) {
    popup.location.href = result.data.authorizationUrl;
  } else {
    window.location.href = result.data.authorizationUrl;
  }
  return result;
}

function flyKeyCloudRememberOAuthResult(payload) {
  const auth = rememberFlyKeyCloudTokens(payload);
  writeFlyKeyCloudAuth({
    ...auth,
    email: payload.user?.email || auth.email || null,
    provider: payload.provider || auth.provider || null
  });
  return readFlyKeyCloudAuth();
}

async function flyKeyCloudImportCurrentState(profileName = "Main") {
  const accessToken = await requireFlyKeyCloudAccessToken();
  const result = await window.FlyKeyApiClient.importLocalState(accessToken, {
    name: profileName,
    contentVersion: currentFlyKeyContentVersion(),
    state: buildFlyKeyLocalStateSnapshot(),
    progress: saved.practiceProgress || {},
    fingerMap: saved.fingerMap || {},
    settings: buildFlyKeySettingsSnapshot()
  });
  if (result.status === "ok") rememberFlyKeyCloudProfile(result.data);
  return result;
}

async function flyKeyCloudListProfiles() {
  const accessToken = await requireFlyKeyCloudAccessToken();
  return window.FlyKeyApiClient.listProfiles(accessToken);
}

async function flyKeyCloudPullProfile(profileId) {
  const accessToken = await requireFlyKeyCloudAccessToken();
  const result = await window.FlyKeyApiClient.getProfileState(accessToken, profileId);
  if (result.status === "ok") {
    applyFlyKeyProfileState(result.data.state);
    rememberFlyKeyCloudProfile({
      id: profileId,
      revision: result.data.revision
    });
  }
  return result;
}

async function flyKeyCloudPushCurrentState(profileId, revision) {
  const accessToken = await requireFlyKeyCloudAccessToken();
  const result = await window.FlyKeyApiClient.putProfileState(accessToken, profileId, {
    revision,
    contentVersion: currentFlyKeyContentVersion(),
    state: buildFlyKeyLocalStateSnapshot(),
    fingerMap: saved.fingerMap || {},
    settings: buildFlyKeySettingsSnapshot()
  });
  if (result.status === "ok") rememberFlyKeyCloudProfile({
    id: profileId,
    revision: result.data.revision
  });
  return result;
}

async function flyKeyCloudPushCurrentProgress(profileId, revision) {
  const accessToken = await requireFlyKeyCloudAccessToken();
  const result = await window.FlyKeyApiClient.putProfileProgress(accessToken, profileId, {
    revision,
    progress: saved.practiceProgress || {}
  });
  if (result.status === "ok") rememberFlyKeyCloudProfile({
    id: profileId,
    revision: result.data.revision
  });
  return result;
}

window.FlyKeyCloudSync = {
  auth: readFlyKeyCloudAuth,
  clearAuth: clearFlyKeyCloudAuth,
  rememberOAuthResult: flyKeyCloudRememberOAuthResult,
  accessToken: currentFlyKeyCloudAccessToken,
  refreshToken: currentFlyKeyCloudRefreshToken,
  register: flyKeyCloudRegister,
  login: flyKeyCloudLogin,
  logout: flyKeyCloudLogout,
  deleteAccount: flyKeyCloudDeleteAccount,
  providers: flyKeyCloudProviders,
  startOAuth: flyKeyCloudStartOAuth,
  importCurrentState: flyKeyCloudImportCurrentState,
  listProfiles: flyKeyCloudListProfiles,
  pullProfile: flyKeyCloudPullProfile,
  pushCurrentState: flyKeyCloudPushCurrentState,
  pushCurrentProgress: flyKeyCloudPushCurrentProgress
};
