import {defaultRequest} from "@/network/request";

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
