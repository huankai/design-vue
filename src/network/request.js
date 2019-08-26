import axios from "axios"

const BASE_URL = "/";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 50000
});
instance.interceptors.response.use(response => {
  return response.data;
});

export function defaultRequest(options) {
  return instance(options);
}
