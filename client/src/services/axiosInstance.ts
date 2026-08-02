import axios from "axios";

import { userAuthStore } from "@/context/AuthStore.js";

import queryClient from "@/utils/queryClient.js";

export const BASE_URL = "http://localhost:3000/";

const authErrors = [
  "ACCESS_TOKEN_MISSING",
  "INVALID_ACCESS_TOKEN",
  "INVALID_REFRESH_TOKEN",
  "REFRESH_TOKEN_EXPIRED",
  "REFRESH_TOKEN_MISSING",
  "USER_NOT_FOUND",
];

const axiosInstanceOptions = {
  baseURL: `${BASE_URL}api/v1`,
  withCredentials: true,
};

const axiosInstance = axios.create(axiosInstanceOptions);
const refreshTokenClient = axios.create(axiosInstanceOptions);

refreshTokenClient.interceptors.response.use((response) => response.data);

let refreshPromise: Promise<void> | null = null;
async function refreshAccessToken() {
  await refreshTokenClient.get("/users/refresh");
}

axiosInstance.interceptors.response.use(
  (response) => response.data.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};
    if (!config) {
      return Promise.reject(error);
    }
    if (status === 401 && data?.errorCode === "ACCESS_TOKEN_EXPIRED") {
      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }
        await refreshPromise;

        return axiosInstance(config);
      } catch (refreshError) {
        queryClient.clear();
        userAuthStore.getState().logout();

        return Promise.reject(refreshError);
      }
    }
    if (status === 401 && authErrors.includes(data?.errorCode)) {
      queryClient.clear();

      userAuthStore.getState().logout();

      return Promise.reject(error);
    }

    return Promise.reject({ status, ...data });
  },
);

export default axiosInstance;
