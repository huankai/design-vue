import moment from "moment";

/**
 * 获取今天的结束时间
 * @returns {moment.Moment}
 */
export function endOfDay() {
  return moment().endOf("day");
}

export function format(value, format) {
  format = format ? format : "YYYY-MM-DD";
  return moment(value).format(format);
}
