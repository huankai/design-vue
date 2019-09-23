import {defaultRequest} from "@/network/request";
import {pmsRequest} from "@/network/request";

/**
 * 获取菜单
 * @returns {*}
 */
export function getMenuList() {
  return defaultRequest({
    method: "GET",
    url: "/data/menu.json"
  });
}

export function findTreeListByAppId(appId) {
  return pmsRequest({
    method: "GET",
    params: {appId},
    url: "/menu/findTreeListByAppId"
  })
}

export function queryForPage(pageQuery) {
  return pmsRequest({
    method: "POST",
    data: pageQuery,
    url: "/menu/list"
  })
}

export function findById(id) {
  return pmsRequest({
    method: "GET",
    params: {id},
    url: "/menu/get"
  })
}

export function deleteById(id) {
  return pmsRequest({
    method: "POST",
    params: {id},
    url: "/menu/delete"
  })
}

export function saveOrUpdate(menu) {
  return pmsRequest({
    method: "POST",
    data: menu,
    url: "/menu/save"
  })
}

export function loadResourceTreeData(appId, permissionId, parentId) {
  return pmsRequest({
    method: "GET",
    params: {appId, permissionId, parentId},
    url: "/menu/tree"
  })
}
