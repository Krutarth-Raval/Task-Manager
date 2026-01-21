import axios from "axios";
import { BASE_URL } from "./index";
 // Added a comment to force Vercel re-build

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//request interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    // Skip token for login and register
    const skipAuthPaths = ["/api/auth/login", "/api/auth/register"];
    if (accessToken && !skipAuthPaths.includes(config.url)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//response interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //handle common error globally
    if (error.response) {
      if (
        (error.response.status === 401 && window.location.pathname !== "/login")
      ) {
        //Redirect to login page
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
