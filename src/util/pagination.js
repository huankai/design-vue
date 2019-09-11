/**
 * 默认显示多少页面
 * @type {number}
 */
export const defaultPageSize = 10;

/**
 * 分页选择
 * @type {*[]}
 */
export const pageSizeOptions = ['10', '20', '50', '100'];

/**
 * 显示总记录数
 * @param total
 * @param range
 * @returns {string}
 */
export function showTotal(total, range) {
  return "共 " + total + " 条记录";
}
