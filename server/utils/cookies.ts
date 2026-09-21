import { thirtyDaysFromNow } from "./date";
import { Response } from "express";

const REFRESH_PATH = "/api/v1/users/refresh";

const defaults = {
  sameSite: "lax" as const,
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

const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: {
  res: Response;
  accessToken: string;
  refreshToken: string;
}) =>
  res
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .cookie("accessToken", accessToken, accessTokenOptions);

const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("refreshToken", { path: REFRESH_PATH })
    .clearCookie("accessToken");

export { setAuthCookies, clearAuthCookies, REFRESH_PATH };