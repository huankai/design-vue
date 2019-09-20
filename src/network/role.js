import {pmsRequest} from "@/network/request";

export function queryForPage(queryPage) {
  return pmsRequest({
    method: "POST",
    data: queryPage,
    url: "/role/list"
  })
}

export function saveOrUpdate(role) {
  return pmsRequest({
    method: "POST",
    data: role,
    url: "/role"
  })
}

export function findById(id) {
  return pmsRequest({
    method: "GET",
    url: "/role/" + id
  })
}
