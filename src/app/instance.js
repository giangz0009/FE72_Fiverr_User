import axios from "axios";

const instance = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MSIsIkhldEhhblN0cmluZyI6IjEyLzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NDQ3NjgwMDAwMCIsIm5iZiI6MTY2NTI0ODQwMCwiZXhwIjoxNjk0NjI0NDAwfQ.SUELcPShU58ZkNS3CbFDhM02KMzll9j00ndjVSaiJ8Q",
  },
});

instance.interceptors.request.use((config) => {
  const authProfile = JSON.parse(localStorage.getItem("authProfile"));

  if (authProfile) {
    config.headers = {
      ...config.headers,
      token: authProfile.token,
    };
  }

  return config;
});

export default instance;
