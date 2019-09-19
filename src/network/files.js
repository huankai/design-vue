import {fsRequest} from "@/network/request";

/**
 *
 * @param queryPage
 * @returns {AxiosPromise}
 */
export function queryForPage(queryPage) {
  return fsRequest({
    method: "POST",
    data: queryPage,
    url: "/info/list"
  });
}

export function deleteFile(id) {
  return fsRequest({
    method: "POST",
    params: {id},
    url: "/info/delete"
  })
}



