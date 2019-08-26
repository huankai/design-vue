/**
 * 排序
 */
class Order {

  /**
   * 查询字段
   */
  #_field;

  /**
   * 排序
   * @type {boolean}
   * @private
   */
  #_desc = false;

  constructor(field, desc) {
    this._field = field;
    this._desc = desc;
  }

  static desc(field) {
    return new Order(field, false);
  }

  static asc(field) {
    return new Order(field, true);
  }

  get field() {
    return this.#_field;
  }

  get desc() {
    return this.#_desc;
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
  #_pageIndex;

  /**
   * 每页显示记录数
   * @type {number}
   * @private
   */
  #_pageSize;

  /**
   * 查询参数
   * @type {{}}
   * @private
   */
  #_param = {};

  /**
   * 查询排序
   * @type {Array}
   * @private
   */
  #_orders = [];

  constructor(pageIndex = 0, pageSize = 10) {
    this._pageIndex = pageIndex;
    this._pageSize = pageSize;
  }

  addOrder(order) {
    this.#_orders.push(order);
  }

  get param() {
    return this.#_param;
  }

  set param(value) {
    this.#_param = value;
  }

  get orders() {
    return this.#_orders;
  }

  set orders(value) {
    this.#_orders = value;
  }

  get pageIndex() {
    return this._pageIndex;
  }

  set pageIndex(value) {
    this._pageIndex = value;
  }

  get pageSize() {
    return this._pageSize;
  }

  set pageSize(value) {
    this._pageSize = value;
  }
}

export {Order, PageQuery};
