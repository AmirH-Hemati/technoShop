import axiosInstance from "./axiosInstance.js";

export async function handelSendCode(phoneNumber: string) {
  const data = await axiosInstance.post("/users/sendCode", { phoneNumber });
  return data;
}

export async function handelSmsAuth(
  phoneNumber: string,
  verificationCode: string,
) {
  const data = await axiosInstance.post("/users/smsAuth", {
    phoneNumber,
    verificationCode,
  });

  return data;
}

export async function logout() {
  const data = await axiosInstance.get("/users/logout");

  return data;
}
export async function getCurrentUser() {
  const data = await axiosInstance.get("/users/me");

  return data;
}
export async function updateCurrentUser(formdata: FormData) {
  const data = await axiosInstance.patch("/users/updateMe", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}
