/**
 * 排序
 */
class Order {

  /**
   * 查询字段
   */
  field;

  /**
   * 排序
   * @type {boolean}
   * @private
   */
  desc = false;

  constructor(field, desc = false) {
    this.field = field;
    this.desc = desc;
  }

  static desc(field) {
    return new Order(field, false);
  }

  static asc(field) {
    return new Order(field, true);
  }
}

/**
 * 分页查询
 */
class PageQuery {

  /**
   * 当前页
   * @type {number}
   * @private
   */
  pageIndex;

  /**
   * 每页显示记录数
   * @type {number}
   * @private
   */
  pageSize;

  /**
   * 查询参数
   * @type {{}}
   * @private
   */
  param = {};

  /**
   * 查询排序
   * @type {Array}
   * @private
   */
  orders = [];

  constructor(param = {}, pageIndex = 0, pageSize = 10) {
    this.param = param;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }

  addOrder(order) {
    this.orders.push(order);
  }

  set param(value) {
    this.param = value;
  }
}

export {Order, PageQuery};
