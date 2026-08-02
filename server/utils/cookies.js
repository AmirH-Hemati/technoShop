const { thirtyDaysFromNow, fifteenMinutesFromNow } = require("./date");

const REFRESH_PATH = "/api/v1/users/refresh";
const defaults = {
  sameSite: "lax",
  httpOnly: true,
  secure: false,
};
const refreshTokenOptions = {
  ...defaults,
  expires: thirtyDaysFromNow(),
  path: REFRESH_PATH,
};
const accessTokenOptions = {
  ...defaults,
  expires: thirtyDaysFromNow(),
};
const setAuthCookies = ({ res, accessToken, refreshToken }) =>
  res
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .cookie("accessToken", accessToken, accessTokenOptions);

const clearAuthCookies = (res) =>
  res
    .clearCookie("refreshToken", { path: REFRESH_PATH })
    .clearCookie("accessToken");
module.exports = { setAuthCookies, clearAuthCookies, REFRESH_PATH };
