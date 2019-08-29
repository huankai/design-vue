import {emiRequest} from "@/network/request";

/**
 *
 * 获取头部 app 应用列表
 * @param queryPage
 * @returns {AxiosPromise}
 */
export function queryForPage(queryPage) {
  return emiRequest({
    method: "POST",
    data: queryPage,
    // url: "/data/address.json"
    url: "city/list"
  });
}


export function findById(id) {
  return emiRequest({
    method: "GET",
    url: "city/" + id
  });
}
