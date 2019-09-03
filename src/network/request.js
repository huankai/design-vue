import axios from "axios"
import {message} from "ant-design-vue";

import fileDownload from "js-file-download";

axios.defaults.timeout = 1000000;
const instance = axios.create({
  baseURL: "/"
});
instance.interceptors.response.use(response => {
  return response.data;
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

export function defaultRequest(options) {
  return instance(options);
}

/* ----------------------------------- emi ------------------------------------------------ */
/**
 * emi
 * @type {AxiosInstance}
 */
const emiInstance = axios.create({
  baseURL: "/emi"
});
emiInstance.interceptors.response.use(response => {
    // if (response.data instanceof Blob) { // 如果是下载文件请求
    //   const filename = decodeURI(res.headers.get('Content-Disposition').split('filename=')[1]); // 获取后端headers里面的文件名
    //   if (window.navigator.msSaveOrOpenBlob) {
    //     navigator.msSaveBlob(blob, filename)  // 兼容ie10
    //   } else {
    //     const a = document.createElement('a');
    //     document.body.appendChild(a); // 兼容火狐，将a标签添加到body当中
    //     a.href = window.URL.createObjectURL(blob);
    //     a.download = filename;
    //     a.target = '_blank'; // a标签增加target属性
    //     a.click();
    //     a.remove();  // 移除a标签
    //     window.URL.revokeObjectURL(url);
    //     fileDownload(response.data, decodeURI(escape(fileName)));
    //     return;
    //   }
    // }
    if (response.status === 200) {
      if (response.data.statusCode === 10200) {
        return response.data;
      }
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
  }
)
;

export function emiRequest(options) {
  return emiInstance(options);
}


/* ------------------------------------ pms ----------------------------------------------- */

const pmsInstance = axios.create({
  baseURL: "/pms"
});
pmsInstance.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data.statusCode === 10200) {
      return response.data;
    }
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
scheduleInstance.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data.statusCode === 10200) {
      return response.data;
    }
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
