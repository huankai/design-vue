import {emiRequest} from "@/network/request";

/**
 *
 * 获取头部 app 应用列表
 * @param queryPage
 * @returns {AxiosPromise}
 */
export function queryForPage(queryPage) {
  return emiRequest({
    method: "POST",
    data: queryPage,
    // url: "/data/address.json"
    url: "city/list"
  });
}

export function getExportData(city) {
  return emiRequest({
    method: "GET",
    data: city,
    responseType: "blob",
    url: "city/export"
  })
}

export function getCityType() {
  return emiRequest({
    method: "GET",
    url: "city/cityType",
  });
}

export function findById(id) {
  return emiRequest({
    method: "GET",
    url: "city/" + id
  });
}

export function findProvinceList() {
  return emiRequest({
    method: "GET",
    url: "city/provinces"
  });
}

export function findByParentId(parentId, maxDepth) {
  return emiRequest({
    method: "GET",
    params: {parentId, maxCityType: maxDepth},
    url: "city/child"
  })
}

export function deleteById(id) {
  return emiRequest({
    method: "POST",
    url: "city/" + id
  })
}

export function saveOrUpdate(city) {
  return emiRequest({
    method: "POST",
    data: city,
    url: "city"
  })
}

export function childs(ids) {
  return emiRequest({
    method: "GET",
    params: {
      "parentIds": ids
    },
    url: "city/childs"
  })
}
