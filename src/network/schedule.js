import {scheduleRequest} from "@/network/request";

/**
 * 获取定时任务
 * @returns {*}
 */
export function queryForPage(queryPage) {
  return scheduleRequest({
    method: "POST",
    data: queryPage,
    url: "/job/list"
  });
}

export function pause(id) {
  return scheduleRequest({
    method: "POST",
    params: {
      id
    },
    url: "/job/pause"
  })
}
export function resume(id) {
  return scheduleRequest({
    method: "POST",
    params: {
      id
    },
    url: "/job/resume"
  })
}
export function trigger(id) {
  return scheduleRequest({
    method: "POST",
    params: {
      id
    },
    url: "/job/trigger"
  })
}

export function findById(id) {
  return scheduleRequest({
    method: "GET",
    url: "/job/" + id
  });
}

export function deleteById(id) {
  return scheduleRequest({
    method: "POST",
    params: {id},
    url: "/job/remove"
  });
}

/**
 * 获取定时任务日志
 * @returns {*}
 */
export function queryForLogPage(queryPage) {
  return scheduleRequest({
    method: "POST",
    data: queryPage,
    url: "/joblog/list"
  });
}


export function saveOrUpdate(schedule) {
  return scheduleRequest({
    method: "POST",
    data: schedule,
    url: "/job"
  });
}

export function getTaskBeans() {
  return scheduleRequest({
    method: "GET",
    url: "/job/getTasks"
  });
}
