import {pmsRequest} from "@/network/request";

export function getUserStatusList() {
  return pmsRequest({
    method: "GET",
    url: "/users/status"
  })
}

export function findById(id) {
  return pmsRequest({
    method: "GET",
    url: "/users/" + id
  })
}

export function disableUser(id) {
  return pmsRequest({
    method: "POST",
    params: {id},
    url: "/users/disabled"
  })
}

export function markDeleted(id) {
  return pmsRequest({
    method: "POST",
    params: {id},
    url: "/users/deleted"
  })
}

export function resetPasswordByAdmin(id, password, confirm) {
  return pmsRequest({
    method: "POST",
    params: {
      id, password, confirm
    },
    url: "/users/reset_pwd"
  })
}

export function enableUser(id) {
  return pmsRequest({
    method: "POST",
    params: {id},
    url: "/users/enabled"
  })
}

export function getByUserTypes() {
  return pmsRequest({
    method: "GET",
    url: "/users/usertypes"
  })
}

export function queryForPage(queryPage) {
  return pmsRequest({
    method: "POST",
    data: queryPage,
    url: "/users/list"
  });
}


export function saveOrUpdate(user) {
  return pmsRequest({
    method: "POST",
    data: user,
    url: "/users"
  })
}
