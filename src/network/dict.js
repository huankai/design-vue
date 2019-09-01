import {emiRequest} from "@/network/request";

/**
 *
 * @param queryPage
 * @returns {AxiosPromise}
 */
export function queryForPage(queryPage) {
  return emiRequest({
    method: "POST",
    data: queryPage,
    url: "baseCode/list"
  });
}

export function findById(id) {
  return emiRequest({
    method: "GET",
    url: "baseCode/" + id
  });
}

export function deleteById(id) {
  return emiRequest({
    method: "POST",
    url: "baseCode/" + id
  })
}

export function saveOrUpdate(code) {
  return emiRequest({
    method: "POST",
    data: code,
    url: "baseCode"
  })
}


export function queryChildForPage(queryPage) {
  return emiRequest({
    method: "POST",
    data: queryPage,
    url: "childCode/list"
  });
}

export function findChildById(id) {
  return emiRequest({
    method: "GET",
    url: "childCode/" + id
  });
}

export function deleteChildById(id) {
  return emiRequest({
    method: "POST",
    url: "childCode/" + id
  })
}

export function saveOrUpdateChild(code) {
  return emiRequest({
    method: "POST",
    data: code,
    url: "childCode"
  })
}
