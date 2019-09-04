import {pmsRequest} from "@/network/request";

/**
 *
 * 获取头部 app 应用列表
 * @param queryPage
 * @returns {AxiosPromise}
 */
export function queryForPage(queryPage) {
  return pmsRequest({
    method: "POST",
    data: queryPage,
    url: "/app/list"
  });
}

export function disableApp(id) {
  return pmsRequest({
    method: "POST",
    params: {
      id
    },
    url: "/app/disabled"
  })
}

export function enableApp(id) {
  return pmsRequest({
    method: "POST",
    params: {
      id
    },
    url: "/app/enabled"
  })
}

export function findById(id) {
  return pmsRequest({
    method: "GET",
    url: "/app/" + id
  })
}

export function deleteById(id) {
  return pmsRequest({
    method: "POST",
    params: {id},
    url: "/app/delete"
  })
}

export function recovery(id) {
  return pmsRequest({
    method: "POST",
    params: {id},
    url: "/app/recovery"
  })
}

export function saveOrUpdate(clientApp) {
  return pmsRequest({
    method: "POST",
    data: clientApp,
    url: "/app"
  })

}

