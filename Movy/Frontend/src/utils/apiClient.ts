import axios from "axios";

// Create Axios instance with default configuration
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("TOKEN") || ""}`,
  },
});

// Refresh the access token using the refresh token
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    const { data } = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh: refreshToken });

    localStorage.setItem("TOKEN", data.access); // Store new access token
    return data.access;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// Axios response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => response, // Return response directly if no error
  async (error) => {
    const originalRequest = error.config;

    // If response is 401 and not yet retried, try refreshing the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        // Set the new access token for retrying the original request
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest); // Retry the original request with new token
      } catch {
        console.error("Session expired. Please log in again.");
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        // Redirect to login or handle accordingly
        // window.location.href = "/login"; // Uncomment for redirect
      }
    }

    return Promise.reject(error); // Reject error if not handled
  }
);

export default apiClient;
