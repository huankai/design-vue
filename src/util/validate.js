import Vue from "vue"

/**
 * 验证模块，基于 antd 使用的 async-validator
 * 因为 async 中对于一些小数、整数的验证存在一些问题，这里在其基础上进行扩展
 * @see https://github.com/yiminghe/async-validator#type
 */
import StringUtils from "@/util/stringUtils";

Vue.prototype.$validator = {

  /**
   * 判断是否为小数
   * @param rule
   * @param value
   * @param callback
   */
  isFloat(rule, value, callback) {
    if (!rule.required && StringUtils.isEmpty(value)) {
      callback();
      return;
    }
    if (isNaN(value)) {
      callback("不是合法的小数");
      return;
    }
    if (rule.whitespace && StringUtils.isBlank(value)) {
      callback("值不能为空白字符串");
      return;
    }
    let pattern = rule.pattern || 4;
    let max = rule.max;
    if (max !== undefined && value > max) {
      callback(rule.message || "最大值不能超过:" + max);
      return;
    }
    let min = rule.min;
    if (min !== undefined && value < min) {
      callback(rule.message || "最小值不能小于:" + min);
      return;
    }
    new RegExp("^([0-9]+$)|(^[0-9]+\\.?[0-9]{1," + pattern + "}$)")
      .test(value) ? callback() : callback(rule.message || "最多保留" + pattern + "位小数");
  },
  isNumber(rule, value, callback) {
    if (!rule.required && StringUtils.isEmpty(value)) {
      callback();
      return;
    }
    if (rule.whitespace && StringUtils.isBlank(value)) {
      callback("值不能为空白字符串");
      return;
    }
    let max = rule.max;
    if (max !== undefined && value > max) {
      callback(rule.message || "最大值不能超过:" + max);
      return;
    }
    let min = rule.min;
    if (min !== undefined && value < min) {
      callback(rule.message || "最小值不能小于:" + min);
      return;
    }
    isNaN(parseInt(value)) ? callback("不是合法的整数") : callback();
  },

  /**
   * 判断是否为手机号
   * @param rule
   * @param value
   * @param callback
   */
  isPhone(rule, value, callback) {
    if (!rule.required && StringUtils.isEmpty(value)) {
      callback();
      return;
    }
    if (rule.whitespace && StringUtils.isBlank(value)) {
      callback("值不能为空白字符串");
      return;
    }
    /^(1[3-8][0-9])\d{8}$/.test(value) ? callback() : callback(rule.message || "不是合法的手机号");
  },

  /**
   * 判断是否为邮箱
   * @param rule
   * @param value
   * @param callback
   */
  isPosOffice(rule, value, callback) {
    if (!rule.required && StringUtils.isEmpty(value)) {
      callback();
      return;
    }
    if (rule.whitespace && StringUtils.isBlank(value)) {
      callback("值不能为空白字符串");
      return;
    }
    /[1-9]\d{5}(?!\d)/.test(value) ? callback() : callback(rule.message || "不是合法的邮政编号")
  }

};
