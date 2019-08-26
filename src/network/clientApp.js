import {defaultRequest} from "@/network/request";

/**
 *
 * 获取头部 app 应用列表
 * @param queryPage
 * @returns {AxiosPromise}
 */
export function queryForPage(queryPage) {
  return defaultRequest({
    method: "GET",
    data: queryPage,
    url: "/data/clientApp.json"
  });
}

