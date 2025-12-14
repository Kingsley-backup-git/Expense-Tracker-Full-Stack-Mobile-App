import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
axios.defaults.baseURL = process.env.EXPO_PUBLIC_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 45000;

// Create an authentication-specific Axios instance (no auth headers, but includes credentials)
export const authInstance: AxiosInstance = axios.create();

authInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    
    return response.data;
  },
  (error) => {
    const { response } = error;
    if (response) {
      const { data, status } = response;
      const errorMessage = data?.error || "An error occurred";
      const message = data?.message ?? "An error occurred, please try again";
      const statusCode = status || 500;
      return Promise.reject({ error: errorMessage, message, statusCode });
    }
    return Promise.reject(error);
  }
);