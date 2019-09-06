import axios from "axios"
import {message} from "ant-design-vue";

// import fileDownload from "js-file-download";

axios.defaults.timeout = 1000000;

function onFulfilled(response) {
  if (response.status === 200) {
    if (response.data.statusCode === 10200) {
      return response.data;
    }
  }
  message.error(response.data.message || response.message || "请稍后再试");
  return Promise.reject(response.data);
}

function onRejected(error) {
  let message = "请稍后再试";
  if (error.response) {
    if (error.response.status === 403) {
      message = error.response.data.message || "您无权限访问";
    } else if (typeof error.response.data !== 'string') {
      message = error.response.data.message || "操作失败";
    }
  }
  message.error(message);
  return Promise.reject(error); // 要调用 reject 方法，否则，会执行调用者的 then() 方法
}

const defaultInstance = axios.create({
  baseURL: "/"
});

defaultInstance.interceptors.response.use(response => onFulfilled(response),
  error => onRejected(error));

export function defaultRequest(options) {
  return defaultInstance(options);
}

/* ----------------------------------- emi ------------------------------------------------ */
/**
 * emi
 * @type {AxiosInstance}
 */
const emiInstance = axios.create({
  baseURL: "/emi"
});
emiInstance.interceptors.response.use(response => onFulfilled(response),
  error => onRejected(error));

export function emiRequest(options) {
  return emiInstance(options);
}


/* ------------------------------------ pms ----------------------------------------------- */

const pmsInstance = axios.create({
  baseURL: "/pms"
});
pmsInstance.interceptors.response.use(response => onFulfilled(response),
  error => onRejected(error));

export function pmsRequest(options) {
  return pmsInstance(options);
}

/* ------------------------------------ schedule ----------------------------------------------- */
/**
 * scheduleInstance
 * @type {AxiosInstance}
 */
const scheduleInstance = axios.create({
  baseURL: "/quartz"
});
scheduleInstance.interceptors.response.use(response => onFulfilled(response),
  error => onRejected(error));

export function scheduleRequest(options) {
  return scheduleInstance(options);
}
