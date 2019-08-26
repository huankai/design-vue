import {defaultRequest} from "@/network/request";

/**
 * 获取头部 app 应用列表
 * @returns {AxiosPromise}
 */
export function getHeaderAppList() {
  return defaultRequest({
    method: "GET",
    url: "/data/headerApp.json"
  });
}
