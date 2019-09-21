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

export function deleteById(id) {
  return pmsRequest({
    method: "POST",
    params: {id},
    url: "/role/delete"
  })
}

export function uploadUserRole(userId, roleIds) {
  if (roleIds.length > 0) {
    roleIds = roleIds.join(",");
  }
  return pmsRequest({
    method: "POST",
    params: {userId, roleIds},
    url: "/userrole/updateRole"
  })
}

export function loadRoleData(appId, userId) {
  return pmsRequest({
    method: "GET",
    params: {appId, userId},
    url: "/role/getUserAppRole"
  })
}
