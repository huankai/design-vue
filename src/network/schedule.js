import {defaultRequest} from "@/network/request";

/**
 * 获取定时任务
 * @returns {*}
 */
export function queryForPage(queryPage) {
  return defaultRequest({
    method: "GET",
    url: "/data/schedule.json"
  });
}

export function findById(id) {
  return defaultRequest({
    method: "GET",
    url: "/data/schedule.json"
  });
}

/**
 * 获取定时任务日志
 * @returns {*}
 */
export function queryForLogPage(queryPage) {
  return defaultRequest({
    method: "GET",
    url: "/data/scheduleLog.json"
  });
}
