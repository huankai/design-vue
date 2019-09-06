import moment from "moment";

/**
 * 获取今天的结束时间
 * @returns {moment.Moment}
 */
export function endOfDay() {
  return moment().endOf("day");
}
