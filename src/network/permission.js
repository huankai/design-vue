import {pmsRequest} from "@/network/request";

export function queryForPage(queryPage) {
  return pmsRequest({
    method: "POST",
    data: queryPage,
    url: "/permission/list"
  })
}

export function saveOrUpdate(permission) {
  return pmsRequest({
    method: "POST",
    data: permission,
    url: "/permission"
  })
}

export function findById(id) {
  return pmsRequest({
    method: "GET",
    url: "/permission/" + id
  })
}

export function deleteById(id) {
  return pmsRequest({
    method: "POST",
    params: {id},
    url: "/permission/delete"
  })
}

export function updateRolePermission(roleId, permissionIds) {
  if (permissionIds.length > 0) {
    permissionIds = permissionIds.join(",");
  }
  return pmsRequest({
    method: "POST",
    params: {roleId, permissionIds},
    url: "/rolepermission/update"
  })
}

export function loadPermissionData(appId, roleId) {
  return pmsRequest({
    method: "GET",
    params: {appId, roleId},
    url: "/permission/getRoleAppPermission"
  })
}
