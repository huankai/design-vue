import axios from "axios"

const instance = axios.create({
  baseURL: "/",
  timeout: 50000
});
instance.interceptors.response.use(response => {
  return response.data;
});

export function defaultRequest(options) {
  return instance(options);
}
