/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 1000,
});

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const restClient = {
  async get<T = any>(url: string, params?: unknown) {
    return (
      await client.get<T>(url, {
        params,
        headers: getHeaders(),
      })
    ).data;
  },
  async post<T = any>(url: string, data: unknown) {
    return (
      await client.post<T>(url, data, {
        headers: getHeaders(),
      })
    ).data;
  },
  async put<T = any>(url: string, data: unknown) {
    return (
      await client.put<T>(url, data, {
        headers: getHeaders(),
      })
    ).data;
  },
  async delete<T = any>(url: string) {
    return (
      await client.delete<T>(url, {
        headers: getHeaders(),
      })
    ).data;
  },
};

export default restClient;
