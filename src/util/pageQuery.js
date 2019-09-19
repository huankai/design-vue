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
    return new Order(field, true);
  }

  static asc(field) {
    return new Order(field, false);
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

  constructor(param = {}, pageIndex = 0, pageSize = 10, orders = []) {
    this.param = param;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.orders = orders;
  }

  addOrder(order) {
    this.orders.push(order);
  }

  set param(value) {
    this.param = value;
  }
}

class ConditionParam {

  /**
   * simple condition
   * @type {Array}
   */
  simple = [];

  /**
   * date Range Condition
   * @type {Array}
   */
  dateRange = [];

  constructor(simple = [], dateRange = []) {
    this.simple = simple;
    this.dateRange = dateRange;
  }

  addSimple(simpleCondition) {
    if (null != simpleCondition && simpleCondition instanceof SimpleCondition) {
      this.simple.push(simpleCondition);
    }
  }

  updateSimpleValue(field, newValue) {
    this.simple.forEach(item => {
      if (item.field === field) {
        item.value = newValue;
      }
    })
  }

  updateDateRangeValue(field, newValue) {
    this.dateRange.forEach(item => {
      if (item.field === field) {
        item.range = newValue.range;
        item.start = newValue.start;
        item.end = newValue.end;
      }
    })
  }

  addDateRange(dateRangeCondition) {
    if (null != dateRangeCondition && dateRangeCondition instanceof DateRangeCondition) {
      this.dateRange.push(dateRangeCondition);
    }
  }
}

/**
 * where  field = value
 * @type {string}
 */
const EQ = "EQ";

/**
 * where field like '%value%'
 * @type {string}
 */
const LIKEANYWHERE = "LIKEANYWHERE";

class SimpleCondition {

  /**
   * field
   */
  field;

  /**
   * operator
   */
  operator;

  /**
   * value
   */
  value;

  constructor(field, value, operator = EQ) {
    this.field = field;
    this.value = value;
    this.operator = operator;
  }
}

class DateRangeCondition {

  /**
   * range
   */
  range;

  /**
   * field
   */
  field;

  /**
   * 开始值
   */
  start;

  /**
   * 结束值
   */
  end;

  constructor(range, field, start, end) {
    this.range = range;
    this.field = field;
    this.start = start;
    this.end = end;
  }
}

export {Order, PageQuery, EQ, LIKEANYWHERE, ConditionParam, SimpleCondition, DateRangeCondition};
