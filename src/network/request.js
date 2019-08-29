import axios from "axios"

axios.defaults.timeout = 5000;
const instance = axios.create({
  baseURL: "/"
});
instance.interceptors.response.use(response => {
  return response.data;
});

export function defaultRequest(options) {
  return instance(options);
}

/**
 * emi
 * @type {AxiosInstance}
 */
const emiInstance = axios.create({
  baseURL: "/emi"
});
emiInstance.interceptors.response.use(response => {
  return response.data;
});

export function emiRequest(options) {
  return emiInstance(options);
}
