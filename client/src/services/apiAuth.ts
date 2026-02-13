import axiosInstance from "./axiosInstance.js";

export async function handelSendCode(phoneNumber) {
  const { data } = await axiosInstance.post("/users/sendCode", { phoneNumber });

  return data;
}

export async function handelSmsAuth(phoneNumber, verificationCode) {
  const { data } = await axiosInstance.post("/users/smsAuth", {
    phoneNumber,
    verificationCode,
  });

  return data.data;
}

export async function logout() {
  const { data } = await axiosInstance.get("/users/logout");

  return data.data;
}
export async function getCurrentUser() {
  const { data } = await axiosInstance.get("/users/me");

  return data.data;
}
export async function updateCurrentUser(formdata) {
  const { data } = await axiosInstance.patch("/users/updateMe", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.data;
}
