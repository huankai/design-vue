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

export function recovery(id) {
  return pmsRequest({
    method: "POST",
    params: {id},
    url: "/org/recovery"
  })
}

export function getRootOrgList(currentOrgId, statusCheck) {
  return pmsRequest({
    method: "GET",
    params: {currentOrgId, statusCheck},
    url: "/org/root"
  })
}

export function getChildList(parentId, currentId) {
  return pmsRequest({
    method: "GET",
    params: {parentId, currentId},
    url: "/org/child"
  })
}

export function saveOrUpdate(org) {
  return pmsRequest({
    method: "POST",
    data: org,
    url: "/org"
  })
}



