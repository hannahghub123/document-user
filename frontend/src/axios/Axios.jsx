import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Update the base URL to match your backend API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor to include the access token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the access token from wherever it's stored (e.g., local storage, state)
    const accessToken = localStorage.getItem('access_token');
    
    // Check if the access token exists before adding it to the headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
