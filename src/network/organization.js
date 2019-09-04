import {pmsRequest} from "@/network/request";

/**
 *
 * 获取机构列表
 * @param queryPage
 * @returns {AxiosPromise}
 */
export function queryForPage(queryPage) {
  return pmsRequest({
    method: "POST",
    data: queryPage,
    url: "/org/list"
  });
}



