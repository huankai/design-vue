import {defaultRequest} from "@/network/request";

/**
 *
 * @param queryPage
 * @returns {AxiosPromise}
 */
export function queryForPage(queryPage) {
  return defaultRequest({
    method: "GET",
    data: queryPage,
    url: "/data/files.json"
  });
}

