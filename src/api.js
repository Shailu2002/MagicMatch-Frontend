import axios from "axios";

// 1. Base URL Set Karo
axios.defaults.baseURL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8003";

// 2. Credentials Set Karo (Optional backup for cookies)
axios.defaults.withCredentials = true;

// 3. Request Interceptor (YE SABSE ZAROORI HAI)
axios.interceptors.request.use(
  (config) => {
    // Login.js mein tune "token" naam se save kiya tha
    const token = localStorage.getItem("token");
    if (token) {
      // Backend middleware (authenticate.js) isi Authorization header ko read karega
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
