import axios from "axios";

// API configuration
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8000/api/v1",

  timeout: 22000,

  headers: {
    "Content-Type": "application/json",
  },
});

// Air quality data interface
export type AirData = {
  provider: string;
  classification: string;
  retrieved_at: string;
  timezone?: string;

  location: {
    latitude: number;
    longitude: number;
  };

  current: Record<string, number | string | null>;

  hourly?: {
    time: string[];
    pm2_5: (number | null)[];
    pm10: (number | null)[];
  };
};

// Default Axios instance export
export default api;
