export default {

  isEmpty(value) {
    return value === null || value === undefined || "" === value;
  },

  isNotEmpty(value) {
    return !this.isEmpty(value);
  },

  isNotBlack(value) {
    return !this.isBlank(value);
  },

  isBlank(value) {
    console.log(Object.prototype.toString.call(value));
    console.log(Object.prototype.toString.call(value) === '[object Number]');
    return value === null ||
      value === undefined ||
      (Object.prototype.toString.call(value) === '[object String]' && value.trim() === "");
  },

  defaultIfEmpty(value, defaultValue) {
    return this.isEmpty(value) ? defaultValue : value;
  },

  trimToEmpty(value) {
    return this.isEmpty(value) ? "" : value.trim();
  }
}
