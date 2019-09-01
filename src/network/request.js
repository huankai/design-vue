import axios from "axios"
import {message} from "ant-design-vue";

axios.defaults.timeout = 1000000;
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
  if (response.status === 200) {
    return response.data;
  }
  message.error(response.data.message || response.message || "请稍后再试");
}, error => {
  if (error.response && error.response.status === 403) {
    message.error(error.response.data.message || "您无权限访问");
  } else {
    debugger
    message.error("未知错误");
  }
  return Promise.reject(error);
});

export function emiRequest(options) {
  return emiInstance(options);
}


/**
 * scheduleInstance
 * @type {AxiosInstance}
 */
const scheduleInstance = axios.create({
  baseURL: "/schedule"
});
scheduleInstance.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data;
  }
  message.error(response.data.message || response.message || "请稍后再试");
}, error => {
  let message = "请稍后再试";
  if (error.response) {
    if (error.response.status === 403) {
      message = error.response.data.message || "您无权限访问";
    } else {
      message = error.response.data.message || "操作失败";
    }
  }
  message.error(message);
});

export function scheduleRequest(options) {
  return scheduleInstance(options);
}
