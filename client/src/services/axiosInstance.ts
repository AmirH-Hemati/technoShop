import axios from "axios";

export const BASE_URL = "https://technoshop-backend-vmit.onrender.com/";
// export const BASE_URL = "http://localhost:3000/";
// export const BASE_URL = "http://192.168.1.3:3000/";
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}api/v1`,
  // headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axiosInstance;
