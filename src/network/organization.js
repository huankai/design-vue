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

export function findById(id) {
  return pmsRequest({
    method: "GET",
    url: "/org/" + id
  })
}

export function deleteById(id) {
  return pmsRequest({
    method: "POST",
    params: {id},
    url: "/org/delete"
  })
}

export function saveOrUpdate(org) {
  return pmsRequest({
    method: "POST",
    data: org,
    url: "/org"
  })
}



