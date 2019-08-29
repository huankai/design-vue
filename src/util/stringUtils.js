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
    return value === null || value === undefined || value.trim() === "";
  },

  defaultIfEmpty(value, defaultValue) {
    return this.isEmpty(value) ? defaultValue : value;
  },

  trimToEmpty(value) {
    return this.isEmpty(value) ? "" : value.trim();
  }
}
